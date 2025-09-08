// Global type definitions
declare global {
  // Extend Window interface
  interface Window {
    // Add custom properties
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }

  // Extend NodeJS environment variables
  namespace NodeJS {
    interface ProcessEnv {
      // API related
      NEXT_PUBLIC_API_BASE_URL: string;
      NEXT_PUBLIC_API_TIMEOUT?: string;

      // Application related
      NEXT_PUBLIC_APP_NAME?: string;
      NEXT_PUBLIC_APP_VERSION?: string;
      NODE_ENV: "development" | "production" | "test";

      // Feature flags
      NEXT_PUBLIC_ENABLE_ANALYTICS?: string;
      NEXT_PUBLIC_ENABLE_DEBUG?: string;

      // Third-party services
      NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?: string;
      NEXT_PUBLIC_SENTRY_DSN?: string;
    }
  }
}

// Common component Props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  "data-testid"?: string;
}

// Style related types
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Color =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type Variant = "solid" | "outline" | "ghost" | "link";

// Animation related types
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

// Responsive breakpoint types
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export {};
