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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`relative ${className}`}>
      {/* 玻璃材质背景 */}
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{
          background: isFocused 
            ? "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))"
            : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          transition: "all 0.3s ease"
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
        className="relative w-full h-full px-6 bg-transparent border-none outline-none text-white placeholder-gray-400 text-lg font-normal rounded-2xl z-10"
      />
    </div>
  );
};

export default FluidGlassInput;
