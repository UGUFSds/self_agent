// Environment variable type definitions
export interface EnvConfig {
  // API configuration
  API_BASE_URL: string;
  API_TIMEOUT: number;

  // Application configuration
  APP_NAME: string;
  APP_VERSION: string;
  APP_ENV: "development" | "staging" | "production";

  // Feature flags
  ENABLE_ANALYTICS: boolean;
  ENABLE_DEBUG: boolean;

  // Third-party services
  GOOGLE_ANALYTICS_ID?: string;
  SENTRY_DSN?: string;
}

// Environment variable validation
export const validateEnv = (): EnvConfig => {
  const requiredVars = ["NEXT_PUBLIC_API_BASE_URL"] as const;

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }

  return {
    API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
    API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000"),
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Amphi",
    APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
    APP_ENV: (process.env.NODE_ENV as EnvConfig["APP_ENV"]) || "development",
    ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
    ENABLE_DEBUG: process.env.NEXT_PUBLIC_ENABLE_DEBUG === "true",
    GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  };
};
