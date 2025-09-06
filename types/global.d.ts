// 全局类型定义
declare global {
  // 扩展 Window 接口
  interface Window {
    // 添加自定义属性
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }

  // 扩展 NodeJS 环境变量
  namespace NodeJS {
    interface ProcessEnv {
      // API 相关
      NEXT_PUBLIC_API_BASE_URL: string;
      NEXT_PUBLIC_API_TIMEOUT?: string;

      // 应用相关
      NEXT_PUBLIC_APP_NAME?: string;
      NEXT_PUBLIC_APP_VERSION?: string;
      NODE_ENV: "development" | "production" | "test";

      // 功能开关
      NEXT_PUBLIC_ENABLE_ANALYTICS?: string;
      NEXT_PUBLIC_ENABLE_DEBUG?: string;

      // 第三方服务
      NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?: string;
      NEXT_PUBLIC_SENTRY_DSN?: string;
    }
  }
}

// 组件 Props 通用类型
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  "data-testid"?: string;
}

// 样式相关类型
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Color =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type Variant = "solid" | "outline" | "ghost" | "link";

// 动画相关类型
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

// 响应式断点类型
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export {};
