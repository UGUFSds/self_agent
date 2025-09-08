"use client";

import React, { useState, useEffect, useRef } from "react";
import { StandardComponentProps } from "@/types/components";
import { cn } from "@/lib/utils";

interface GlobalSearchProps extends StandardComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch?: (_query: string) => void;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "page" | "component" | "documentation" | "api";
  url: string;
  category: string;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({
  isOpen,
  onClose,
  onSearch,
  className,
  ...props
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock search data
  const mockSearchData: SearchResult[] = [
    {
      id: "1",
      title: "Project Architecture Documentation",
      description: "Learn about the overall project architecture and tech stack",
      type: "documentation",
      url: "/docs/architecture",
      category: "Documentation"
    },
    {
      id: "2",
      title: "Component Development Standards",
      description: "Learn how to develop new components",
      type: "documentation",
      url: "/docs/components",
      category: "Documentation"
    },
    {
      id: "3",
      title: "CardNav Component",
      description: "Top navigation menu component",
      type: "component",
      url: "/components/cardnav",
      category: "Components"
    },
    {
      id: "4",
      title: "User Authentication API",
      description: "User login and registration related interfaces",
      type: "api",
      url: "/api/auth",
      category: "API"
    },
    {
      id: "5",
      title: "Dashboard Page",
      description: "User main console page",
      type: "page",
      url: "/dashboard",
      category: "Pages"
    }
  ];

  // Search logic
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = mockSearchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
    setSelectedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!searchResults.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handleResultClick(searchResults[selectedIndex]);
        } else if (searchQuery.trim()) {
          onSearch?.(searchQuery);
        }
        break;
      case "Escape":
        onClose();
        break;
    }
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    onSearch?.(result.title);
    onClose();
    // Here you can add actual navigation logic
    console.log("Navigate to:", result.url);
  };

  // Focus on input
  useEffect(() => {
    if (isOpen) {
      // Focus on input
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
        "flex items-start justify-center pt-20",
        "animate-in fade-in duration-300",
        className
      )}
      onClick={onClose}
      {...props}
    >
      <div 
        ref={searchRef}
        className={cn(
          "w-full max-w-2xl mx-4",
          "animate-in slide-in-from-top-4 fade-in zoom-in-95 duration-300",
          "transform transition-all ease-out"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Search pages, components, docs, APIs..."
              className="w-full px-6 py-4 text-lg bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:scale-[1.02] focus:scale-[1.02]"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mt-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
            {searchResults.length > 0 ? (
              <div className="max-h-96 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div
                    key={result.id}
                    className={cn(
                      "group px-6 py-4 border-b border-white/10 cursor-pointer transition-all duration-300",
                      "hover:bg-white/10 hover:scale-[1.01] hover:shadow-lg hover:shadow-white/5",
                      index === selectedIndex && "bg-white/15 scale-[1.01] shadow-lg shadow-white/5"
                    )}
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-200">
                        {result.type === "documentation" && (
                          <svg className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        )}
                        {result.type === "component" && (
                          <svg className="w-4 h-4 text-green-400 group-hover:text-green-300 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        )}
                        {result.type === "api" && (
                          <svg className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        {result.type === "page" && (
                          <svg className="w-4 h-4 text-orange-400 group-hover:text-orange-300 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-medium truncate">
                            {result.title}
                          </h3>
                          <span className="px-2 py-1 text-xs bg-white/10 text-white/70 rounded-full">
                            {result.category}
                          </span>
                        </div>
                        <p className="text-white/60 text-sm line-clamp-2">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-8 text-center">
                <svg className="w-12 h-12 text-white/30 mx-auto mb-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-white/60">
                  {isSearching ? "Searching..." : "No results found"}
                </p>
                <p className="text-white/40 text-sm mt-1">
                  Try using different keywords
                </p>
              </div>
            )}
          </div>
        )}

        {/* Search Tips */}
        {!searchQuery && (
          <div className="mt-6 text-center">
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:scale-105 transition-all duration-300">
                <div className="text-white/60 text-sm mb-1">Shortcut</div>
                <div className="text-white/40 text-xs">Ctrl + K</div>
              </div>
              <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:scale-105 transition-all duration-300">
                <div className="text-white/60 text-sm mb-1">Search Scope</div>
                <div className="text-white/40 text-xs">Site-wide</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;
