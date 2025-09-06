# 组件详细规范文档

## 📋 目录
- [组件概览](#组件概览)
- [CardNav 组件](#cardnav-组件)
- [Orb 组件](#orb-组件)
- [FluidGlassInput 组件](#fluidglassinput-组件)
- [StarBorder 组件](#starborder-组件)
- [ShinyText 组件](#shinytext-组件)
- [LogoLoop 组件](#logoloop-组件)
- [组件开发模板](#组件开发模板)

## 🧩 组件概览

### 组件分类
- **布局组件**: CardNav (导航菜单)
- **交互组件**: Orb (3D球体), StarBorder (星形按钮)
- **输入组件**: FluidGlassInput (玻璃输入框)
- **展示组件**: ShinyText (闪光文字), LogoLoop (Logo循环)
- **基础组件**: 待扩展

### 组件依赖关系
```
CardNav (独立)
├── GSAP (动画)
└── react-icons (图标)

Orb (独立)
└── OGL (WebGL)

FluidGlassInput (独立)
└── Tailwind CSS (样式)

StarBorder (独立)
└── CSS动画

ShinyText (独立)
└── CSS动画

LogoLoop (独立)
└── react-icons (图标)
```

## 🧭 CardNav 组件

### 功能描述
顶部导航菜单组件，支持毛玻璃效果、GSAP动画和自定义右侧内容。

### 接口定义
```typescript
export interface CardNavProps {
  logo: string;                    // Logo图片路径
  logoAlt?: string;               // Logo替代文本
  items: CardNavItem[];           // 导航项目数组
  className?: string;             // 自定义样式类
  ease?: string;                  // GSAP缓动函数
  baseColor?: string;             // 基础颜色
  menuColor?: string;             // 菜单文字颜色
  buttonBgColor?: string;         // 按钮背景颜色
  buttonTextColor?: string;       // 按钮文字颜色
  rightContent?: React.ReactNode; // 右侧自定义内容
}

export type CardNavItem = {
  label: string;                  // 导航标签
  bgColor: string;                // 背景颜色
  textColor: string;              // 文字颜色
  links: CardNavLink[];           // 子链接数组
};

export type CardNavLink = {
  label: string;                  // 链接标签
  href: string;                   // 链接地址
  ariaLabel: string;              // 无障碍标签
};
```

### 使用示例
```typescript
import CardNav from "@/components/CardNav";
import { NAV_ITEMS } from "@/constants/navigation";

<CardNav
  logo="/logo.svg"
  logoAlt="Agent Logo"
  items={NAV_ITEMS}
  baseColor="#1a1a1a"
  menuColor="#fff"
  buttonBgColor="#ffffff"
  buttonTextColor="#000000"
  ease="power3.out"
  rightContent={
    <div className="flex items-center gap-4">
      <button>Doc</button>
      <ShinyText text="API" />
    </div>
  }
/>
```

### 样式配置
```typescript
// constants/ui.ts
export const CARD_NAV_CONFIG = {
  logo: {
    size: "h-[72px]",
    color: "brightness-0 drop-shadow-[0_0_1px_rgba(0,0,0,0.8)]",
    hover: "transition-transform duration-500 ease-in-out hover:rotate-360"
  },
  menu: {
    background: "backdrop-blur-md bg-white/5 border border-white/10",
    borderRadius: "rounded-lg"
  }
};
```

### 动画配置
- **展开动画**: GSAP Timeline，支持自定义缓动
- **悬停效果**: CSS transition，0.3s duration
- **Logo旋转**: 360度旋转，500ms duration

### 响应式设计
- **桌面端**: 完整菜单展示
- **移动端**: 汉堡菜单，固定定位

## 🌐 Orb 组件

### 功能描述
3D球体组件，使用WebGL渲染，支持鼠标交互和主题文字展示。

### 接口定义
```typescript
export interface OrbProps extends AnimatedComponentProps {
  hoverIntensity?: number;        // 悬停强度 (0-2)
  rotateOnHover?: boolean;        // 悬停时旋转
  hue?: number;                   // 色调 (0-360)
  forceHoverState?: boolean;      // 强制悬停状态
  scale?: number;                 // 缩放比例
  themeText?: string;             // 主题文字
  themeTextSize?: string;         // 主题文字大小
  themeTextColor?: string;        // 主题文字颜色
}
```

### 使用示例
```typescript
import Orb from "@/components/Orb";

<Orb
  hoverIntensity={1.2}
  rotateOnHover={true}
  hue={0}
  forceHoverState={false}
  scale={2.2}
  themeText="What can I do for you today?"
  themeTextSize="text-2xl"
  themeTextColor="text-white"
  onClick={() => alert("Orb交互功能待实现")}
/>
```

### 3D渲染配置
- **渲染器**: OGL WebGL Renderer
- **几何体**: 球体 (Sphere)
- **材质**: 自定义着色器材质
- **光照**: 环境光 + 点光源

### 交互功能
- **鼠标悬停**: 球体旋转和缩放
- **点击事件**: 支持自定义点击处理
- **主题文字**: 居中显示，支持自定义样式

### 性能优化
- **自动清理**: 组件卸载时清理WebGL资源
- **帧率控制**: 使用requestAnimationFrame
- **内存管理**: 及时释放几何体和材质

## 💎 FluidGlassInput 组件

### 功能描述
流体玻璃材质输入框，具有毛玻璃背景和悬停动画效果。

### 接口定义
```typescript
export interface FluidGlassInputProps extends InputComponentProps {
  placeholder?: string;           // 占位符文本
  glassIntensity?: number;        // 玻璃效果强度
  borderIntensity?: number;       // 边框强度
  hoverScale?: number;            // 悬停缩放比例
}
```

### 使用示例
```typescript
import FluidGlassInput from "@/components/FluidGlassInput";

<FluidGlassInput
  placeholder="Type in anything you want to know..."
  className="w-96 h-10"
  glassIntensity={0.1}
  borderIntensity={0.2}
  hoverScale={1.02}
  onClick={() => alert("搜索功能待实现")}
/>
```

### 玻璃效果实现
```css
/* 毛玻璃背景 */
backdrop-filter: blur(10px);
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);

/* 悬停效果 */
&:hover {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transform: scale(1.02);
}
```

### 动画配置
- **悬停动画**: 0.3s ease-in-out
- **焦点动画**: 边框高亮
- **输入动画**: 文字渐入效果

## ⭐ StarBorder 组件

### 功能描述
星形边框按钮，具有动态边框动画和悬停效果。

### 接口定义
```typescript
export interface StarBorderProps extends ButtonComponentProps {
  color?: string;                 // 边框颜色
  speed?: string;                 // 动画速度
  glowIntensity?: number;         // 发光强度
  borderWidth?: number;           // 边框宽度
}
```

### 使用示例
```typescript
import StarBorder from "@/components/StarBorder";

<StarBorder
  as="button"
  color="white"
  speed="5s"
  glowIntensity={0.8}
  borderWidth={2}
  className="[&>div]:px-[14px] [&>div]:py-[8px] [&>div]:text-[11px]"
  onClick={() => alert("开始功能待实现")}
>
  <span className="text-[11px] font-normal">Get Started</span>
</StarBorder>
```

### 星形边框实现
```css
/* 星形边框动画 */
@keyframes starBorder {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.star-border {
  position: relative;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    var(--border-color) 45deg,
    transparent 90deg
  );
  animation: starBorder var(--speed) linear infinite;
}
```

### 动画配置
- **旋转动画**: 360度连续旋转
- **发光效果**: box-shadow 动态变化
- **悬停效果**: 缩放和亮度变化

## ✨ ShinyText 组件

### 功能描述
闪光文字组件，具有流动的闪光效果。

### 接口定义
```typescript
export interface ShinyTextProps extends AnimatedComponentProps {
  text: string;                   // 显示文字
  speed?: number;                 // 闪光速度 (秒)
  shineColor?: string;            // 闪光颜色
  shineWidth?: number;            // 闪光宽度
  disabled?: boolean;             // 禁用闪光效果
}
```

### 使用示例
```typescript
import ShinyText from "@/components/ShinyText";

<ShinyText
  text="API"
  speed={2}
  shineColor="rgba(255, 255, 255, 0.8)"
  shineWidth={100}
  className="text-gray-600 text-2xl font-normal"
/>
```

### 闪光效果实现
```css
/* 闪光动画 */
@keyframes shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.shiny-text {
  position: relative;
  overflow: hidden;
}

.shiny-text::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--shine-color) 50%,
    transparent 100%
  );
  animation: shine var(--speed) ease-in-out infinite;
}
```

### 动画配置
- **闪光动画**: 从左到右流动
- **速度控制**: 可配置动画持续时间
- **颜色控制**: 可配置闪光颜色和透明度

## 🔄 LogoLoop 组件

### 功能描述
Logo循环展示组件，支持无限循环、渐变遮罩和悬停暂停。

### 接口定义
```typescript
export interface LogoLoopProps {
  logos: LogoItem[];              // Logo项目数组
  speed?: number;                 // 滚动速度
  direction?: "left" | "right";   // 滚动方向
  logoHeight?: number;            // Logo高度
  gap?: number;                   // Logo间距
  pauseOnHover?: boolean;         // 悬停暂停
  fadeOut?: boolean;              // 渐变遮罩
  className?: string;             // 自定义样式
}

export interface LogoItem {
  node: React.ReactNode;          // Logo节点
  title: string;                  // Logo标题
  href: string;                   // 链接地址
  ariaLabel?: string;             // 无障碍标签
}
```

### 使用示例
```typescript
import LogoLoop from "@/components/LogoLoop";
import { SiReact, SiNextdotjs } from "react-icons/si";

<LogoLoop
  logos={[
    {
      node: <SiReact className="text-white" size={28} />,
      title: "React",
      href: "#"
    },
    {
      node: <SiNextdotjs className="text-white" size={28} />,
      title: "Next.js",
      href: "#"
    }
  ]}
  speed={30}
  direction="left"
  logoHeight={40}
  gap={60}
  pauseOnHover={true}
  fadeOut={true}
  className="w-80"
/>
```

### 循环动画实现
```css
/* 无限循环动画 */
@keyframes logoLoop {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.logo-track {
  display: flex;
  animation: logoLoop var(--speed) linear infinite;
}

.logo-track:hover {
  animation-play-state: paused;
}
```

### 渐变遮罩实现
```css
/* 左右渐变遮罩 */
.logo-container {
  position: relative;
  overflow: hidden;
}

.logo-container::before,
.logo-container::after {
  content: '';
  position: absolute;
  top: 0;
  width: 50px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.logo-container::before {
  left: 0;
  background: linear-gradient(to right, black, transparent);
}

.logo-container::after {
  right: 0;
  background: linear-gradient(to left, black, transparent);
}
```

## 📝 组件开发模板

### 基础组件模板
```typescript
"use client";

import React, { useState, useRef, useEffect } from "react";
import { StandardComponentProps } from "@/types/components";
import { cn } from "@/lib/utils";

interface CustomComponentProps extends StandardComponentProps {
  // 组件特定属性
  customProp?: string;
  variant?: "default" | "primary" | "secondary";
}

const CustomComponent: React.FC<CustomComponentProps> = ({
  // 标准属性
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled = false,
  loading = false,
  size = "md",
  variant = "default",
  
  // 组件特定属性
  customProp,
  
  // 其他属性
  ...props
}) => {
  // 状态定义
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  // 引用定义
  const componentRef = useRef<HTMLDivElement>(null);
  
  // 事件处理器
  const handleClick = (event: React.MouseEvent) => {
    if (disabled || loading) return;
    onClick?.(event);
  };
  
  const handleMouseEnter = (event: React.MouseEvent) => {
    setIsHovered(true);
    onMouseEnter?.(event);
  };
  
  const handleMouseLeave = (event: React.MouseEvent) => {
    setIsHovered(false);
    onMouseLeave?.(event);
  };
  
  // 样式类名
  const baseClasses = "base-component-classes";
  const sizeClasses = {
    xs: "text-xs px-2 py-1",
    sm: "text-sm px-3 py-2",
    md: "text-base px-4 py-3",
    lg: "text-lg px-6 py-4",
    xl: "text-xl px-8 py-5"
  };
  const variantClasses = {
    default: "bg-gray-100 text-gray-900",
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white"
  };
  const stateClasses = {
    disabled: "opacity-50 cursor-not-allowed",
    loading: "opacity-75 cursor-wait",
    hovered: isHovered ? "hover:scale-105" : "",
    active: isActive ? "scale-95" : ""
  };
  
  const componentClasses = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    stateClasses.disabled,
    stateClasses.loading,
    stateClasses.hovered,
    stateClasses.active,
    className
  );
  
  // 渲染
  return (
    <div
      ref={componentRef}
      className={componentClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {loading && (
        <div className="loading-spinner">
          {/* 加载指示器 */}
        </div>
      )}
      
      <div className="component-content">
        {/* 组件内容 */}
        {customProp && <span>{customProp}</span>}
      </div>
    </div>
  );
};

export default CustomComponent;
```

### 动画组件模板
```typescript
"use client";

import React, { useEffect, useRef } from "react";
import { AnimatedComponentProps } from "@/types/components";
import { gsap } from "gsap";

interface AnimatedComponentProps extends AnimatedComponentProps {
  // 动画特定属性
  animationType?: "fade" | "slide" | "scale" | "rotate";
  trigger?: "mount" | "hover" | "click";
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({
  // 标准属性
  className,
  onClick,
  
  // 动画属性
  animationDuration = 0.5,
  animationDelay = 0,
  animationEasing = "power2.out",
  animationType = "fade",
  trigger = "mount",
  
  // 其他属性
  ...props
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>();
  
  // 动画配置
  const animationConfig = {
    fade: { opacity: 0, y: 20 },
    slide: { x: -100, opacity: 0 },
    scale: { scale: 0, opacity: 0 },
    rotate: { rotation: 180, opacity: 0 }
  };
  
  // 初始化动画
  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    const config = animationConfig[animationType];
    
    // 设置初始状态
    gsap.set(element, config);
    
    // 创建时间线
    const tl = gsap.timeline({
      delay: animationDelay,
      ease: animationEasing
    });
    
    // 添加动画
    tl.to(element, {
      duration: animationDuration,
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0
    });
    
    timelineRef.current = tl;
    
    return () => {
      tl.kill();
    };
  }, [animationDuration, animationDelay, animationEasing, animationType]);
  
  // 悬停动画
  const handleMouseEnter = () => {
    if (trigger === "hover" && timelineRef.current) {
      timelineRef.current.play();
    }
  };
  
  const handleMouseLeave = () => {
    if (trigger === "hover" && timelineRef.current) {
      timelineRef.current.reverse();
    }
  };
  
  // 点击动画
  const handleClick = (event: React.MouseEvent) => {
    if (trigger === "click" && timelineRef.current) {
      timelineRef.current.restart();
    }
    onClick?.(event);
  };
  
  return (
    <div
      ref={elementRef}
      className={className}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* 组件内容 */}
    </div>
  );
};

export default AnimatedComponent;
```

### 表单组件模板
```typescript
"use client";

import React, { useState, useRef } from "react";
import { InputComponentProps } from "@/types/components";
import { cn } from "@/lib/utils";

interface CustomInputProps extends InputComponentProps {
  // 输入特定属性
  type?: "text" | "email" | "password" | "number";
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({
  // 标准属性
  className,
  value,
  defaultValue,
  placeholder,
  onChange,
  onInput,
  onFocus,
  onBlur,
  disabled = false,
  required = false,
  autoFocus = false,
  maxLength,
  minLength,
  
  // 输入特定属性
  type = "text",
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  
  // 其他属性
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 事件处理器
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };
  
  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    onInput?.(event);
  };
  
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };
  
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };
  
  // 样式类名
  const containerClasses = cn(
    "relative",
    className
  );
  
  const inputClasses = cn(
    "w-full px-3 py-2 border rounded-md transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-blue-500",
    error ? "border-red-500" : "border-gray-300",
    disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white",
    leftIcon ? "pl-10" : "",
    rightIcon ? "pr-10" : ""
  );
  
  const labelClasses = cn(
    "block text-sm font-medium mb-1",
    error ? "text-red-600" : "text-gray-700"
  );
  
  const errorClasses = "text-sm text-red-600 mt-1";
  const helperClasses = "text-sm text-gray-500 mt-1";
  
  return (
    <div className={containerClasses}>
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={inputRef}
          type={type}
          value={value ?? internalValue}
          placeholder={placeholder}
          onChange={handleChange}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && <div className={errorClasses}>{error}</div>}
      {helperText && !error && <div className={helperClasses}>{helperText}</div>}
    </div>
  );
};

export default CustomInput;
```

## 📚 总结

本组件规范文档详细描述了 Amphi 项目中所有组件的：

1. **接口定义**: 完整的 TypeScript 类型定义
2. **使用示例**: 实际代码使用案例
3. **实现细节**: 核心功能和动画实现
4. **配置选项**: 可自定义的属性和样式
5. **开发模板**: 标准化的组件开发模板

遵循这些规范可以确保：
- **组件一致性**: 所有组件遵循相同的设计模式
- **类型安全**: 完整的 TypeScript 支持
- **可维护性**: 清晰的接口和实现
- **可扩展性**: 标准化的扩展方式

建议在开发新组件时参考这些模板和规范，确保项目的一致性和质量。
