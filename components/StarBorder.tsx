import React from "react";
import { ButtonComponentProps } from "@/types/components";

type StarBorderProps<T extends React.ElementType> = ButtonComponentProps & {
  as?: T;
  color?: string;
  speed?: React.CSSProperties["animationDuration"];
  thickness?: number;
};

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  children,
  disabled = false,
  // loading = false,
  // size = "md",
  // variant = "default",
  type = "button",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[16px] ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      {...(rest as any)}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as any).style,
      }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0 group-hover:opacity-100 group-hover:scale-125 group-hover:blur-sm transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0 group-hover:opacity-100 group-hover:scale-125 group-hover:blur-sm transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="relative z-1 bg-black border border-gray-800 text-center text-[13px] py-[10px] px-[18px] rounded-[14px] font-normal transition-all duration-500 group overflow-hidden">
        {/* 悬停时的边框发光 */}
        <div className="absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-all duration-500 border-2 border-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 shadow-[0_0_8px_rgba(147,51,234,0.1)]"></div>
        {/* 文字内容 */}
        <div className="relative z-10 text-gray-400 group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.4)] transition-all duration-500">
          {children}
        </div>
      </div>
    </Component>
  );
};

export default StarBorder;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
//         'star-movement-top': 'star-movement-top linear infinite alternate',
//       },
//       keyframes: {
//         'star-movement-bottom': {
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
//           '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
//         },
//         'star-movement-top': {
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
//           '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
//         },
//       },
//     },
//   }
// }
