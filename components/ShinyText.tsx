import React from "react";
import { AnimatedComponentProps } from "@/types/components";

interface ShinyTextProps extends AnimatedComponentProps {
  text: string;
  speed?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
  animationDuration,
  animationDelay,
  animationEasing,
  // autoPlay = true,
  // loop = true,
  ...props
}) => {
  const defaultAnimationDuration = `${speed}s`;

  return (
    <div
      className={`bg-clip-text inline-block ${disabled ? "" : "animate-shine"} ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 70%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: (animationDuration
          ? `${animationDuration}ms`
          : defaultAnimationDuration) as string,
        animationDelay: animationDelay ? `${animationDelay}ms` : undefined,
        animationTimingFunction: animationEasing,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {text}
    </div>
  );
};

export default ShinyText;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shine: {
//           '0%': { 'background-position': '100%' },
//           '100%': { 'background-position': '-100%' },
//         },
//       },
//       animation: {
//         shine: 'shine 5s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };
