import React from "react";

// Logo 项目类型定义
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

// Logo 循环组件属性
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
