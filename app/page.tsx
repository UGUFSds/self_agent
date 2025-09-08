"use client";

import { useState, useEffect } from "react";
import Orb from "@/components/Orb";
import StarBorder from "@/components/StarBorder";
import ShinyText from "@/components/ShinyText";
import FluidGlassInput from "@/components/FluidGlassInput";
import CardNav from "@/components/CardNav";
import LogoLoop from "@/components/LogoLoop";
import GlobalSearch from "@/components/GlobalSearch";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
} from "react-icons/si";
import { NAV_ITEMS } from "@/constants/navigation";
import { BRAND_CONFIG, LAYOUT_CONFIG, BUTTON_CONFIG } from "@/constants/ui";
import { USER_MESSAGES } from "@/constants/messages";

export default function Home() {
  // Use constant configurations
  const navItems = NAV_ITEMS;
  
  // Global search state
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  // Keyboard shortcut support (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsGlobalSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={LAYOUT_CONFIG.container.className}
      style={{ backgroundColor: LAYOUT_CONFIG.container.backgroundColor }}
    >
      {/* Brand Logo - Top Left */}
      <div className={LAYOUT_CONFIG.brand.position}>
        <div
          className={LAYOUT_CONFIG.brand.className}
          style={{ fontFamily: BRAND_CONFIG.fontFamily }}
        >
          {BRAND_CONFIG.name}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className={LAYOUT_CONFIG.menu.position}>
        <CardNav
          logo="/logo.svg"
          logoAlt="Agent Logo"
          items={navItems}
          baseColor="#1a1a1a"
          menuColor="#fff"
          buttonBgColor="#ffffff"
          buttonTextColor="#000000"
          ease="power3.out"
          rightContent={
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="card-nav-cta-button inline-flex items-center justify-center border-0 rounded-[calc(0.75rem-0.2rem)] px-4 py-2 font-medium cursor-pointer transition-all duration-300 backdrop-blur-sm bg-white/20 border border-white/30 hover:bg-white/30 hover:shadow-lg hover:shadow-white/20 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-xl"
                style={{ color: "#000000" }}
                onClick={() => {
                  // TODO: Implement documentation viewing functionality
                  alert(USER_MESSAGES.doc);
                }}
              >
                Doc
              </button>
              <div
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:opacity-80"
                onClick={() => {
                  // TODO: Implement API documentation functionality
                  alert(USER_MESSAGES.api);
                }}
              >
                <ShinyText
                  text="API"
                  speed={2}
                  className="text-gray-600 text-2xl font-normal"
                />
              </div>
            </div>
          }
        />
      </div>

      <div
        className="relative mobile-scale"
        style={{
          width: "100%",
          height: "600px",
          transform: "scale(1.8)",
        }}
      >
        {/* Main content: text, search box and buttons */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white font-normal leading-tight pointer-events-none">
          <div className="mb-6 mt-12">
            <div className="text-2xl mb-2 font-sans tracking-tight">
              What can I do for you today?
            </div>
          </div>

          {/* AI Model Input Box */}
          <div className="pointer-events-auto z-20 mb-4 -mt-2">
            <FluidGlassInput
              placeholder="Ask AI anything you want to know..."
              className="w-96 h-10"
              onClick={() => {
                // TODO: Implement AI model chat functionality
                alert(USER_MESSAGES.aiChat);
              }}
            />
          </div>

          {/* Button Group */}
          <div className="pointer-events-auto z-20 flex gap-4 items-center mt-2">
            <div className="relative group">
              <StarBorder
                as="button"
                color="white"
                speed="5s"
                className="[&>div]:px-[14px] [&>div]:py-[8px] [&>div]:text-[11px]"
                onClick={() => {
                  // TODO: Implement user onboarding flow
                  alert(USER_MESSAGES.getStarted);
                }}
              >
                <span className="text-[11px] font-normal">Get Started</span>
              </StarBorder>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 w-24 opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-200 ease-out z-50">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-md overflow-hidden shadow-lg shadow-black/20">
                  <button
                    className="w-full px-2 py-1.5 text-left text-white/90 text-[10px] hover:bg-white/10 hover:text-white transition-all duration-150 ease-out"
                    onClick={() => {
                      // TODO: Implement user authentication login
                      alert(USER_MESSAGES.signIn);
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className="w-full px-2 py-1.5 text-left text-white/90 text-[10px] hover:bg-white/10 hover:text-white transition-all duration-150 ease-out"
                    onClick={() => {
                      // TODO: Implement user authentication login
                      alert(USER_MESSAGES.signIn);
                    }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>

            <button
              className={BUTTON_CONFIG.learnMore.className}
              onClick={() => {
                // TODO: Implement product introduction page
                alert(USER_MESSAGES.learnMore);
              }}
            >
              {BUTTON_CONFIG.learnMore.text}
            </button>
          </div>
        </div>

        {/* Orb Component */}
        <Orb
          hoverIntensity={1.2}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
          onClick={() => {
            // TODO: Implement Orb 3D interaction functionality
            alert(USER_MESSAGES.orbInteraction);
          }}
        />
      </div>

      {/* Global Search Button - Top Right */}
      <div className={LAYOUT_CONFIG.searchButton.position}>
        <button
          className={LAYOUT_CONFIG.searchButton.className}
          onClick={() => setIsGlobalSearchOpen(true)}
          title="Global Search (Ctrl+K)"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* LogoLoop Component - Bottom Right */}
      <div className={LAYOUT_CONFIG.logoLoop.position}>
        <div className="text-white text-sm font-sans tracking-tight mb-3 text-center opacity-70 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg px-3 py-1">
          Partners
        </div>
        <LogoLoop
          logos={[
            {
              node: <SiReact className="text-white" size={28} />,
              title: "React",
              href: "#",
            },
            {
              node: <SiNextdotjs className="text-white" size={28} />,
              title: "Next.js",
              href: "#",
            },
            {
              node: <SiTypescript className="text-white" size={28} />,
              title: "TypeScript",
              href: "#",
            },
            {
              node: <SiTailwindcss className="text-white" size={28} />,
              title: "Tailwind CSS",
              href: "#",
            },
            {
              node: <SiJavascript className="text-white" size={28} />,
              title: "JavaScript",
              href: "#",
            },
            {
              node: <SiNodedotjs className="text-white" size={28} />,
              title: "Node.js",
              href: "#",
            },
          ]}
          speed={80}
          direction="left"
          logoHeight={40}
          gap={48}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#000000"
          scaleOnHover={true}
          className="px-4"
          ariaLabel="Technology stack"
        />
      </div>

      {/* Global Search Component */}
      <GlobalSearch
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        onSearch={(_query) => {
          // TODO: Implement global search logic
        }}
      />
    </div>
  );
}
