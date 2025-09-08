import React from "react";

// Logo item type definition
export interface LogoItem {
  node: React.ReactNode;
  title: string;
  href: string;
  ariaLabel?: string;
  src?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
}

// Logo loop component properties
export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  className?: string;
}
