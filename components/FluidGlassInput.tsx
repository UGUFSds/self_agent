"use client";

import React, { useState } from 'react';

interface FluidGlassInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const FluidGlassInput: React.FC<FluidGlassInputProps> = ({
  placeholder = "Search",
  value = "",
  onChange,
  className = ""
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 玻璃材质背景 */}
      <div 
        className="absolute inset-0 rounded-2xl transition-all duration-300 ease-in-out"
        style={{
          background: isFocused 
            ? "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))"
            : isHovered
            ? "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))"
            : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          backdropFilter: "blur(10px)",
          border: isFocused 
            ? "1px solid rgba(255,255,255,0.2)"
            : isHovered
            ? "1px solid rgba(255,255,255,0.15)"
            : "1px solid rgba(255,255,255,0.1)",
          transform: isHovered ? "scale(1.02)" : "scale(1)",
          boxShadow: isHovered 
            ? "0 8px 32px rgba(255,255,255,0.1)"
            : "0 4px 16px rgba(255,255,255,0.05)"
        }}
      />
      
      {/* 输入框 */}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="relative w-full h-full px-6 bg-transparent border-none outline-none text-white placeholder-gray-400 text-sm font-normal rounded-2xl z-10 transition-all duration-300"
      />
    </div>
  );
};

export default FluidGlassInput;
