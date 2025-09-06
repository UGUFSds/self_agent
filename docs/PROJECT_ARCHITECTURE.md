# Amphi AI Agent Platform - 项目架构文档

## 📋 目录
- [项目概述](#项目概述)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [组件架构](#组件架构)
- [开发规范](#开发规范)
- [后端集成规范](#后端集成规范)
- [维护指南](#维护指南)

## 🎯 项目概述

**Amphi** 是一个基于 Next.js 15 的 AI Agent 平台前端项目，采用现代化的技术栈和组件化架构设计。

### 核心特性
- **静态导出**: 支持 Cloudflare Pages 部署
- **响应式设计**: 移动端适配，保持原有尺寸
- **组件化架构**: 基于 shadcn/ui 和 reactbits.dev 组件
- **类型安全**: 完整的 TypeScript 类型定义
- **代码质量**: ESLint + Prettier 代码规范

## 🛠 技术栈

### 核心框架
- **Next.js 15.5.2** - React 全栈框架
- **React 19.1.0** - 用户界面库
- **TypeScript 5.9.2** - 类型安全

### 样式和UI
- **Tailwind CSS v4** - 原子化CSS框架
- **shadcn/ui** - 组件库基础
- **reactbits.dev** - 特效组件库
- **react-icons** - 图标库

### 动画和3D
- **GSAP 3.13.0** - 动画库
- **OGL 1.0.11** - WebGL 3D渲染

### 开发工具
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **PostCSS** - CSS处理

## 📁 项目结构

```
/Users/novayaou/MyProject/agent/
├── app/                          # Next.js App Router
│   ├── globals.css              # 全局样式
│   ├── layout.tsx               # 根布局
│   └── page.tsx                 # 主页面
├── components/                   # 组件库
│   ├── CardNav.tsx              # 导航菜单组件
│   ├── FluidGlassInput.tsx      # 流体玻璃输入框
│   ├── LogoLoop.tsx             # Logo循环展示
│   ├── Orb.tsx                  # 3D球体组件
│   ├── ShinyText.tsx            # 闪光文字组件
│   └── StarBorder.tsx           # 星形边框按钮
├── constants/                    # 常量配置
│   ├── messages.ts              # 用户消息常量
│   ├── navigation.ts            # 导航配置
│   └── ui.ts                    # UI配置常量
├── types/                        # 类型定义
│   ├── api.ts                   # API类型
│   ├── components.ts            # 组件类型
│   ├── env.ts                   # 环境变量类型
│   ├── global.d.ts              # 全局类型
│   └── logo.ts                  # Logo类型
├── public/                       # 静态资源
├── docs/                         # 项目文档
├── out/                          # 构建输出
├── components.json               # shadcn/ui配置
├── next.config.ts                # Next.js配置
├── tsconfig.json                 # TypeScript配置
├── package.json                  # 依赖管理
└── README.md                     # 项目说明
```

## 🧩 组件架构

### 组件层次结构

```
Home (app/page.tsx)
├── Brand Logo (Amphi)
├── CardNav (导航菜单)
│   ├── Logo
│   ├── Navigation Items
│   └── Right Content (Doc + API)
├── Search Button (右上角)
├── Main Content
│   ├── FluidGlassInput (搜索框)
│   ├── StarBorder (Get Started按钮)
│   │   └── Dropdown Menu
│   ├── Learn More Button
│   └── Orb (3D球体)
│       └── Theme Text
└── LogoLoop (合作伙伴展示)
```

### 组件接口规范

#### 1. 标准组件接口 (StandardComponentProps)
```typescript
interface StandardComponentProps {
  // 通用事件处理器
  onClick?: (event: React.MouseEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  
  // 通用状态
  disabled?: boolean;
  loading?: boolean;
  
  // 通用样式
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "secondary" | "ghost" | "outline";
  className?: string;
}
```

#### 2. 输入组件接口 (InputComponentProps)
```typescript
interface InputComponentProps extends StandardComponentProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
}
```

#### 3. 按钮组件接口 (ButtonComponentProps)
```typescript
interface ButtonComponentProps extends StandardComponentProps {
  type?: "button" | "submit" | "reset";
  href?: string;
  target?: string;
  rel?: string;
}
```

#### 4. 动画组件接口 (AnimatedComponentProps)
```typescript
interface AnimatedComponentProps extends StandardComponentProps {
  animationDuration?: number;
  animationDelay?: number;
  animationEasing?: string;
  autoPlay?: boolean;
  loop?: boolean;
}
```

### 核心组件详解

#### CardNav 组件
- **功能**: 顶部导航菜单，支持毛玻璃效果
- **特性**: GSAP动画、响应式设计、自定义右侧内容
- **接口**: `CardNavProps`
- **依赖**: GSAP, react-icons

#### Orb 组件
- **功能**: 3D球体展示，支持交互
- **特性**: WebGL渲染、鼠标交互、主题文字
- **接口**: `OrbProps`
- **依赖**: OGL (WebGL库)

#### FluidGlassInput 组件
- **功能**: 流体玻璃材质输入框
- **特性**: 毛玻璃效果、悬停动画
- **接口**: `FluidGlassInputProps`
- **依赖**: Tailwind CSS

#### StarBorder 组件
- **功能**: 星形边框按钮
- **特性**: 动态边框动画、悬停效果
- **接口**: `StarBorderProps`
- **依赖**: CSS动画

#### ShinyText 组件
- **功能**: 闪光文字效果
- **特性**: 可配置闪光速度、颜色
- **接口**: `ShinyTextProps`
- **依赖**: CSS动画

#### LogoLoop 组件
- **功能**: Logo循环展示
- **特性**: 无限循环、渐变遮罩、悬停暂停
- **接口**: `LogoLoopProps`
- **依赖**: react-icons

## 📋 开发规范

### 1. 文件命名规范
- **组件文件**: PascalCase (如 `CardNav.tsx`)
- **常量文件**: camelCase (如 `navigation.ts`)
- **类型文件**: camelCase (如 `components.ts`)
- **页面文件**: kebab-case (如 `page.tsx`)

### 2. 导入顺序规范
```typescript
// 1. React相关
import React from "react";
import { useState, useEffect } from "react";

// 2. 第三方库
import { gsap } from "gsap";
import { SiReact } from "react-icons/si";

// 3. 内部组件
import CardNav from "@/components/CardNav";

// 4. 常量和类型
import { NAV_ITEMS } from "@/constants/navigation";
import { CardNavProps } from "@/types/components";

// 5. 样式
import "./styles.css";
```

### 3. 组件开发规范

#### 组件结构
```typescript
"use client"; // 客户端组件标记

import React from "react";
import { ComponentProps } from "@/types/components";

interface CustomComponentProps extends ComponentProps {
  // 组件特定属性
}

const CustomComponent: React.FC<CustomComponentProps> = ({
  // 解构属性
  className,
  onClick,
  ...props
}) => {
  // 状态定义
  const [state, setState] = useState();
  
  // 事件处理器
  const handleClick = (event: React.MouseEvent) => {
    onClick?.(event);
  };
  
  // 渲染
  return (
    <div className={className} onClick={handleClick}>
      {/* 组件内容 */}
    </div>
  );
};

export default CustomComponent;
```

#### 事件处理规范
```typescript
// ✅ 正确：使用可选链和类型安全
const handleClick = (event: React.MouseEvent) => {
  onClick?.(event);
};

// ✅ 正确：提供默认实现
const handleClick = (event: React.MouseEvent) => {
  if (onClick) {
    onClick(event);
  } else {
    // 默认行为
    alert("功能待实现");
  }
};

// ❌ 错误：直接调用可能未定义的函数
const handleClick = (event: React.MouseEvent) => {
  onClick(event); // 可能报错
};
```

### 4. 样式规范

#### Tailwind CSS 使用规范
```typescript
// ✅ 正确：使用常量配置
className={LAYOUT_CONFIG.container.className}

// ✅ 正确：条件样式
className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}

// ❌ 错误：硬编码样式
className="min-h-screen bg-black flex items-center justify-center"
```

#### 内联样式规范
```typescript
// ✅ 正确：使用常量
style={{ backgroundColor: LAYOUT_CONFIG.container.backgroundColor }}

// ✅ 正确：动态样式
style={{ 
  fontFamily: BRAND_CONFIG.fontFamily,
  transform: `scale(${scale})`
}}

// ❌ 错误：硬编码值
style={{ backgroundColor: "#000000" }}
```

### 5. 常量管理规范

#### 常量文件结构
```typescript
// constants/feature.ts
export const FEATURE_CONFIG = {
  // 配置对象
  property: "value",
  nested: {
    property: "value"
  }
};

export const FEATURE_MESSAGES = {
  // 消息常量
  success: "操作成功",
  error: "操作失败"
};
```

#### 常量使用规范
```typescript
// ✅ 正确：导入并使用常量
import { NAV_ITEMS, USER_MESSAGES } from "@/constants/...";

// ❌ 错误：硬编码值
const navItems = [{ label: "About", bgColor: "#0D0716" }];
```

## 🔌 后端集成规范

### 1. API 类型定义

#### 基础响应类型
```typescript
// types/api.ts
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

#### 业务数据类型
```typescript
// types/business.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "pending";
  capabilities: string[];
  createdAt: string;
}
```

### 2. API 服务层

#### 服务类结构
```typescript
// services/api.ts
class ApiService {
  private baseURL: string;
  private token?: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });
      const data = await response.json();
      
      if (!response.ok) {
        throw new ApiError(data.message, data.code);
      }
      
      return data;
    } catch (error) {
      throw new ApiError("网络请求失败", "NETWORK_ERROR");
    }
  }

  // GET 请求
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  // POST 请求
  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // PUT 请求
  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // DELETE 请求
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiService = new ApiService(process.env.NEXT_PUBLIC_API_URL || "");
```

#### 业务服务层
```typescript
// services/userService.ts
import { apiService } from "./api";
import { User, ApiResponse } from "@/types";

export class UserService {
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiService.get<User>("/user/me");
  }

  async updateUser(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiService.put<User>("/user/me", data);
  }

  async deleteUser(): Promise<ApiResponse<void>> {
    return apiService.delete<void>("/user/me");
  }
}

export const userService = new UserService();
```

### 3. 状态管理

#### React Query 集成
```typescript
// hooks/useUser.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { User } from "@/types";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => userService.getCurrentUser(),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<User>) => userService.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
```

### 4. 错误处理

#### 全局错误处理
```typescript
// utils/errorHandler.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return "未知错误";
};
```

## 🔧 维护指南

### 1. 添加新组件

#### 步骤1: 创建组件文件
```bash
# 在 components/ 目录下创建新组件
touch components/NewComponent.tsx
```

#### 步骤2: 定义组件接口
```typescript
// components/NewComponent.tsx
import { StandardComponentProps } from "@/types/components";

interface NewComponentProps extends StandardComponentProps {
  // 组件特定属性
  customProp?: string;
}

const NewComponent: React.FC<NewComponentProps> = ({
  className,
  onClick,
  customProp,
  ...props
}) => {
  // 组件实现
};

export default NewComponent;
```

#### 步骤3: 更新类型定义
```typescript
// types/components.ts
export interface NewComponentProps extends StandardComponentProps {
  customProp?: string;
}
```

#### 步骤4: 添加常量配置
```typescript
// constants/ui.ts
export const NEW_COMPONENT_CONFIG = {
  defaultProps: {
    customProp: "defaultValue"
  },
  styles: {
    container: "base-classes",
    active: "active-classes"
  }
};
```

### 2. 添加新页面

#### 步骤1: 创建页面文件
```bash
# 在 app/ 目录下创建新页面
mkdir app/new-page
touch app/new-page/page.tsx
```

#### 步骤2: 定义页面组件
```typescript
// app/new-page/page.tsx
"use client";

import { useState } from "react";
import CardNav from "@/components/CardNav";
import { NAV_ITEMS } from "@/constants/navigation";

export default function NewPage() {
  return (
    <div className="min-h-screen bg-black">
      <CardNav items={NAV_ITEMS} />
      {/* 页面内容 */}
    </div>
  );
}
```

### 3. 添加新API接口

#### 步骤1: 定义API类型
```typescript
// types/api.ts
export interface NewApiRequest {
  param1: string;
  param2: number;
}

export interface NewApiResponse {
  result: string;
  data: unknown;
}
```

#### 步骤2: 创建服务方法
```typescript
// services/newService.ts
import { apiService } from "./api";
import { NewApiRequest, NewApiResponse } from "@/types";

export class NewService {
  async callNewApi(data: NewApiRequest): Promise<ApiResponse<NewApiResponse>> {
    return apiService.post<NewApiResponse>("/new-endpoint", data);
  }
}

export const newService = new NewService();
```

#### 步骤3: 创建React Hook
```typescript
// hooks/useNewApi.ts
import { useMutation } from "@tanstack/react-query";
import { newService } from "@/services/newService";

export const useNewApi = () => {
  return useMutation({
    mutationFn: (data: NewApiRequest) => newService.callNewApi(data),
  });
};
```

### 4. 代码质量检查

#### 运行检查命令
```bash
# 类型检查
npm run type-check

# 代码检查
npm run lint

# 代码格式化
npm run format

# 构建检查
npm run build
```

#### 修复常见问题
```typescript
// ❌ 问题：未使用的变量
const unusedVar = "value";

// ✅ 解决：使用下划线前缀
const _unusedVar = "value";

// ❌ 问题：any类型
const data: any = response.data;

// ✅ 解决：使用具体类型
const data: ApiResponse<User> = response.data;

// ❌ 问题：硬编码值
className="min-h-screen bg-black"

// ✅ 解决：使用常量
className={LAYOUT_CONFIG.container.className}
```

### 5. 部署和维护

#### 构建和部署
```bash
# 本地构建
npm run build

# 导出静态文件
npm run export

# 部署到Cloudflare Pages
# 构建命令: npm run build
# 输出目录: out
```

#### 环境配置
```bash
# 复制环境变量模板
cp env.example .env.local

# 配置环境变量
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=Amphi
```

## 📚 总结

本架构文档提供了 Amphi AI Agent Platform 的完整技术规范，包括：

1. **项目结构**: 清晰的目录组织和文件命名规范
2. **组件架构**: 标准化的组件接口和开发模式
3. **开发规范**: 代码风格、导入顺序、事件处理等规范
4. **后端集成**: API类型定义、服务层、状态管理规范
5. **维护指南**: 添加组件、页面、API的具体步骤

遵循这些规范可以确保：
- **代码一致性**: 团队成员遵循相同的开发标准
- **可维护性**: 清晰的架构便于后续维护和扩展
- **类型安全**: 完整的TypeScript类型定义
- **质量保证**: 自动化代码检查和格式化

建议在开发过程中严格遵循这些规范，并在需要时及时更新文档。
