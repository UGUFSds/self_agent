# 后端集成规范文档

## 📋 目录
- [API 设计规范](#api-设计规范)
- [数据模型定义](#数据模型定义)
- [服务层架构](#服务层架构)
- [状态管理](#状态管理)
- [错误处理](#错误处理)
- [认证和授权](#认证和授权)
- [性能优化](#性能优化)
- [测试策略](#测试策略)

## 🔌 API 设计规范

### 1. RESTful API 设计

#### URL 设计规范
```typescript
// ✅ 正确：RESTful 风格
GET    /api/users              // 获取用户列表
GET    /api/users/:id          // 获取特定用户
POST   /api/users              // 创建用户
PUT    /api/users/:id          // 更新用户
DELETE /api/users/:id          // 删除用户

// ✅ 正确：嵌套资源
GET    /api/users/:id/posts    // 获取用户的文章
POST   /api/users/:id/posts    // 为用户创建文章

// ✅ 正确：查询参数
GET    /api/users?page=1&limit=10&search=john
GET    /api/posts?category=tech&sort=created_at&order=desc

// ❌ 错误：非 RESTful 风格
GET    /api/getUsers
POST   /api/createUser
GET    /api/userPosts/:userId
```

#### HTTP 状态码规范
```typescript
// 成功响应
200 OK          // 请求成功
201 Created     // 资源创建成功
204 No Content  // 请求成功，无返回内容

// 客户端错误
400 Bad Request     // 请求参数错误
401 Unauthorized    // 未认证
403 Forbidden       // 无权限
404 Not Found       // 资源不存在
422 Unprocessable Entity // 数据验证失败

// 服务器错误
500 Internal Server Error // 服务器内部错误
502 Bad Gateway          // 网关错误
503 Service Unavailable  // 服务不可用
```

### 2. 请求和响应格式

#### 请求格式
```typescript
// 请求头
Content-Type: application/json
Authorization: Bearer <token>
Accept: application/json

// 请求体
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

#### 响应格式
```typescript
// 成功响应
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2023-12-25T10:00:00Z"
  },
  "message": "User created successfully",
  "timestamp": "2023-12-25T10:00:00Z"
}

// 错误响应
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  },
  "timestamp": "2023-12-25T10:00:00Z"
}

// 分页响应
{
  "success": true,
  "data": [
    { "id": "1", "name": "User 1" },
    { "id": "2", "name": "User 2" }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  },
  "message": "Users retrieved successfully",
  "timestamp": "2023-12-25T10:00:00Z"
}
```

### 3. API 版本控制

#### 版本控制策略
```typescript
// URL 路径版本控制
GET /api/v1/users
GET /api/v2/users

// 请求头版本控制
Accept: application/vnd.amphi.v1+json
Accept: application/vnd.amphi.v2+json

// 查询参数版本控制
GET /api/users?version=1
GET /api/users?version=2
```

## 📊 数据模型定义

### 1. 用户模型

#### 用户基础模型
```typescript
// types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export type UserRole = "admin" | "user" | "guest";
export type UserStatus = "active" | "inactive" | "pending" | "suspended";

export interface UserPreferences {
  theme: "light" | "dark" | "auto";
  language: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

export interface PrivacySettings {
  profileVisibility: "public" | "private" | "friends";
  dataSharing: boolean;
  analytics: boolean;
}
```

#### 用户相关类型
```typescript
// 用户创建请求
export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

// 用户更新请求
export interface UpdateUserRequest {
  name?: string;
  avatar?: string;
  preferences?: Partial<UserPreferences>;
}

// 用户查询参数
export interface UserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  sortBy?: "name" | "email" | "createdAt";
  sortOrder?: "asc" | "desc";
}
```

### 2. 认证模型

#### 认证相关类型
```typescript
// types/auth.ts
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
```

### 3. 业务模型

#### 代理模型
```typescript
// types/agent.ts
export interface Agent {
  id: string;
  name: string;
  description: string;
  type: AgentType;
  status: AgentStatus;
  capabilities: AgentCapability[];
  configuration: AgentConfiguration;
  metrics: AgentMetrics;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export type AgentType = "chatbot" | "assistant" | "automation" | "analytics";
export type AgentStatus = "active" | "inactive" | "training" | "error";

export interface AgentCapability {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  parameters: Record<string, unknown>;
}

export interface AgentConfiguration {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  tools: string[];
}

export interface AgentMetrics {
  totalInteractions: number;
  successRate: number;
  averageResponseTime: number;
  lastActivityAt: string;
}
```

#### 对话模型
```typescript
// types/conversation.ts
export interface Conversation {
  id: string;
  agentId: string;
  userId: string;
  title: string;
  status: ConversationStatus;
  messages: Message[];
  metadata: ConversationMetadata;
  createdAt: string;
  updatedAt: string;
}

export type ConversationStatus = "active" | "archived" | "deleted";

export interface Message {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  metadata: MessageMetadata;
  createdAt: string;
}

export type MessageRole = "user" | "assistant" | "system";

export interface MessageMetadata {
  tokens: number;
  processingTime: number;
  model: string;
  tools?: string[];
}

export interface ConversationMetadata {
  totalMessages: number;
  totalTokens: number;
  duration: number;
  tags: string[];
}
```

## 🏗️ 服务层架构

### 1. API 服务基类

#### 基础服务类
```typescript
// services/baseApiService.ts
import { ApiResponse, ApiError } from "@/types/api";

export class BaseApiService {
  protected baseURL: string;
  protected token?: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = undefined;
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.error?.message || "Request failed",
          data.error?.code || "UNKNOWN_ERROR",
          response.status
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Network error", "NETWORK_ERROR");
    }
  }

  protected async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  protected async post<T>(
    endpoint: string,
    data: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  protected async put<T>(
    endpoint: string,
    data: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  protected async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  protected async patch<T>(
    endpoint: string,
    data: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }
}
```

### 2. 用户服务

#### 用户服务实现
```typescript
// services/userService.ts
import { BaseApiService } from "./baseApiService";
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserQueryParams,
  PaginatedResponse,
} from "@/types";

export class UserService extends BaseApiService {
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.get<User>("/user/me");
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return this.get<User>(`/users/${id}`);
  }

  async getUsers(params?: UserQueryParams): Promise<PaginatedResponse<User>> {
    const queryString = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    const endpoint = queryString ? `/users?${queryString}` : "/users";
    return this.get<PaginatedResponse<User>>(endpoint);
  }

  async createUser(data: CreateUserRequest): Promise<ApiResponse<User>> {
    return this.post<User>("/users", data);
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<ApiResponse<User>> {
    return this.put<User>(`/users/${id}`, data);
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/users/${id}`);
  }

  async updateCurrentUser(data: UpdateUserRequest): Promise<ApiResponse<User>> {
    return this.put<User>("/user/me", data);
  }

  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<void>> {
    return this.post<void>("/user/change-password", data);
  }

  async uploadAvatar(file: File): Promise<ApiResponse<{ avatarUrl: string }>> {
    const formData = new FormData();
    formData.append("avatar", file);

    return this.request<{ avatarUrl: string }>("/user/avatar", {
      method: "POST",
      body: formData,
      headers: {
        // 不设置 Content-Type，让浏览器自动设置
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    });
  }
}

export const userService = new UserService(
  process.env.NEXT_PUBLIC_API_URL || ""
);
```

### 3. 认证服务

#### 认证服务实现
```typescript
// services/authService.ts
import { BaseApiService } from "./baseApiService";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RefreshTokenRequest,
  ResetPasswordRequest,
} from "@/types";

export class AuthService extends BaseApiService {
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.post<LoginResponse>("/auth/login", data);
  }

  async register(data: RegisterRequest): Promise<ApiResponse<LoginResponse>> {
    return this.post<LoginResponse>("/auth/register", data);
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.post<void>("/auth/logout", {});
  }

  async refreshToken(data: RefreshTokenRequest): Promise<ApiResponse<LoginResponse>> {
    return this.post<LoginResponse>("/auth/refresh", data);
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<void>> {
    return this.post<void>("/auth/reset-password", data);
  }

  async verifyEmail(token: string): Promise<ApiResponse<void>> {
    return this.post<void>("/auth/verify-email", { token });
  }

  async resendVerificationEmail(): Promise<ApiResponse<void>> {
    return this.post<void>("/auth/resend-verification", {});
  }
}

export const authService = new AuthService(
  process.env.NEXT_PUBLIC_API_URL || ""
);
```

### 4. 代理服务

#### 代理服务实现
```typescript
// services/agentService.ts
import { BaseApiService } from "./baseApiService";
import {
  Agent,
  CreateAgentRequest,
  UpdateAgentRequest,
  AgentQueryParams,
  PaginatedResponse,
} from "@/types";

export class AgentService extends BaseApiService {
  async getAgents(params?: AgentQueryParams): Promise<PaginatedResponse<Agent>> {
    const queryString = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    const endpoint = queryString ? `/agents?${queryString}` : "/agents";
    return this.get<PaginatedResponse<Agent>>(endpoint);
  }

  async getAgentById(id: string): Promise<ApiResponse<Agent>> {
    return this.get<Agent>(`/agents/${id}`);
  }

  async createAgent(data: CreateAgentRequest): Promise<ApiResponse<Agent>> {
    return this.post<Agent>("/agents", data);
  }

  async updateAgent(id: string, data: UpdateAgentRequest): Promise<ApiResponse<Agent>> {
    return this.put<Agent>(`/agents/${id}`, data);
  }

  async deleteAgent(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/agents/${id}`);
  }

  async startAgent(id: string): Promise<ApiResponse<Agent>> {
    return this.post<Agent>(`/agents/${id}/start`, {});
  }

  async stopAgent(id: string): Promise<ApiResponse<Agent>> {
    return this.post<Agent>(`/agents/${id}/stop`, {});
  }

  async getAgentMetrics(id: string): Promise<ApiResponse<AgentMetrics>> {
    return this.get<AgentMetrics>(`/agents/${id}/metrics`);
  }
}

export const agentService = new AgentService(
  process.env.NEXT_PUBLIC_API_URL || ""
);
```

## 🔄 状态管理

### 1. React Query 集成

#### 查询配置
```typescript
// hooks/useApi.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { authService } from "@/services/authService";

// 查询键常量
export const QUERY_KEYS = {
  users: ["users"] as const,
  user: (id: string) => ["users", id] as const,
  currentUser: ["users", "me"] as const,
  agents: ["agents"] as const,
  agent: (id: string) => ["agents", id] as const,
} as const;

// 用户相关 Hooks
export const useCurrentUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.currentUser,
    queryFn: () => userService.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5分钟
    retry: 1,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.user(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  });
};

export const useUsers = (params?: UserQueryParams) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.users, params],
    queryFn: () => userService.getUsers(params),
    keepPreviousData: true,
  });
};

// 用户操作 Hooks
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
      userService.updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users });
    },
  });
};
```

#### 认证相关 Hooks
```typescript
// hooks/useAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      // 存储 token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      
      // 设置服务 token
      userService.setToken(response.data.token);
      
      // 更新缓存
      queryClient.setQueryData(QUERY_KEYS.currentUser, response.data.user);
      
      // 跳转到首页
      router.push("/dashboard");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // 清除 token
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      
      // 清除服务 token
      userService.clearToken();
      
      // 清除缓存
      queryClient.clear();
      
      // 跳转到登录页
      router.push("/login");
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (response) => {
      // 存储 token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      
      // 设置服务 token
      userService.setToken(response.data.token);
      
      // 更新缓存
      queryClient.setQueryData(QUERY_KEYS.currentUser, response.data.user);
      
      // 跳转到首页
      router.push("/dashboard");
    },
  });
};
```

### 2. 全局状态管理

#### 认证状态管理
```typescript
// stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      
      setUser: (user) => set({ user, isAuthenticated: true }),
      setToken: (token) => set({ token }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      }),
    }
  )
);
```

#### 应用状态管理
```typescript
// stores/appStore.ts
import { create } from "zustand";

interface AppState {
  theme: "light" | "dark" | "auto";
  sidebarOpen: boolean;
  notifications: Notification[];
  
  // Actions
  setTheme: (theme: "light" | "dark" | "auto") => void;
  toggleSidebar: () => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: "auto",
  sidebarOpen: true,
  notifications: [],
  
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((state) => ({ 
    sidebarOpen: !state.sidebarOpen 
  })),
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, notification]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  clearNotifications: () => set({ notifications: [] }),
}));
```

## ⚠️ 错误处理

### 1. 错误类型定义

#### 错误类型
```typescript
// types/error.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, "VALIDATION_ERROR", 400, details);
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string = "Authentication required") {
    super(message, "AUTHENTICATION_ERROR", 401);
  }
}

export class AuthorizationError extends ApiError {
  constructor(message: string = "Insufficient permissions") {
    super(message, "AUTHORIZATION_ERROR", 403);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Resource not found") {
    super(message, "NOT_FOUND_ERROR", 404);
  }
}

export class NetworkError extends ApiError {
  constructor(message: string = "Network error") {
    super(message, "NETWORK_ERROR");
  }
}
```

### 2. 错误处理工具

#### 错误处理工具
```typescript
// utils/errorHandler.ts
import { ApiError, ValidationError, AuthenticationError } from "@/types/error";

export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return "An unexpected error occurred";
};

export const handleValidationError = (error: unknown): Record<string, string> => {
  if (error instanceof ValidationError && error.details) {
    return error.details as Record<string, string>;
  }
  
  return {};
};

export const isAuthenticationError = (error: unknown): boolean => {
  return error instanceof AuthenticationError;
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof NetworkError;
};
```

### 3. 错误边界组件

#### 错误边界实现
```typescript
// components/ErrorBoundary.tsx
"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { ApiError } from "@/types/error";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## 🔐 认证和授权

### 1. 认证流程

#### 认证中间件
```typescript
// middleware/auth.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt";

export function authMiddleware(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const payload = verifyToken(token);
    request.headers.set("user-id", payload.userId);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
}
```

#### JWT 工具
```typescript
// utils/jwt.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export function generateToken(payload: Omit<JWTPayload, "iat" | "exp">): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function generateRefreshToken(payload: Omit<JWTPayload, "iat" | "exp">): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
}
```

### 2. 权限控制

#### 权限检查 Hook
```typescript
// hooks/usePermissions.ts
import { useCurrentUser } from "./useApi";
import { UserRole } from "@/types";

export const usePermissions = () => {
  const { data: user } = useCurrentUser();

  const hasRole = (role: UserRole): boolean => {
    return user?.data.role === role;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return roles.includes(user?.data.role);
  };

  const canAccess = (resource: string, action: string): boolean => {
    // 实现基于资源的权限检查
    const permissions = user?.data.permissions || [];
    return permissions.some(
      (permission) => permission.resource === resource && permission.actions.includes(action)
    );
  };

  const isOwner = (resourceOwnerId: string): boolean => {
    return user?.data.id === resourceOwnerId;
  };

  return {
    hasRole,
    hasAnyRole,
    canAccess,
    isOwner,
    user: user?.data,
  };
};
```

#### 权限组件
```typescript
// components/PermissionGate.tsx
import React from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { UserRole } from "@/types";

interface PermissionGateProps {
  children: React.ReactNode;
  roles?: UserRole[];
  resource?: string;
  action?: string;
  ownerId?: string;
  fallback?: React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  roles,
  resource,
  action,
  ownerId,
  fallback = null,
}) => {
  const { hasAnyRole, canAccess, isOwner } = usePermissions();

  // 检查角色权限
  if (roles && !hasAnyRole(roles)) {
    return <>{fallback}</>;
  }

  // 检查资源权限
  if (resource && action && !canAccess(resource, action)) {
    return <>{fallback}</>;
  }

  // 检查所有者权限
  if (ownerId && !isOwner(ownerId)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
```

## ⚡ 性能优化

### 1. 请求优化

#### 请求缓存
```typescript
// utils/requestCache.ts
class RequestCache {
  private cache = new Map<string, { data: unknown; timestamp: number }>();
  private readonly TTL = 5 * 60 * 1000; // 5分钟

  set(key: string, data: unknown): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string): unknown | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}

export const requestCache = new RequestCache();
```

#### 请求去重
```typescript
// utils/requestDeduplication.ts
class RequestDeduplication {
  private pendingRequests = new Map<string, Promise<unknown>>();

  async deduplicate<T>(
    key: string,
    requestFn: () => Promise<T>
  ): Promise<T> {
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key) as Promise<T>;
    }

    const promise = requestFn().finally(() => {
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }
}

export const requestDeduplication = new RequestDeduplication();
```

### 2. 数据优化

#### 分页优化
```typescript
// hooks/useInfiniteQuery.ts
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteUsers = (params?: UserQueryParams) => {
  return useInfiniteQuery({
    queryKey: [...QUERY_KEYS.users, params],
    queryFn: ({ pageParam = 1 }) =>
      userService.getUsers({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    keepPreviousData: true,
  });
};
```

#### 虚拟滚动
```typescript
// components/VirtualList.tsx
import { FixedSizeList as List } from "react-window";

interface VirtualListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (props: { index: number; style: React.CSSProperties }) => React.ReactNode;
}

export const VirtualList = <T,>({
  items,
  height,
  itemHeight,
  renderItem,
}: VirtualListProps<T>) => {
  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemHeight}
      width="100%"
    >
      {renderItem}
    </List>
  );
};
```

## 🧪 测试策略

### 1. API 测试

#### 服务测试
```typescript
// services/__tests__/userService.test.ts
import { userService } from "../userService";
import { ApiResponse, User } from "@/types";

// Mock fetch
global.fetch = jest.fn();

describe("UserService", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe("getCurrentUser", () => {
    it("should return current user", async () => {
      const mockUser: User = {
        id: "1",
        email: "test@example.com",
        name: "Test User",
        role: "user",
        status: "active",
        preferences: {
          theme: "light",
          language: "en",
          notifications: {
            email: true,
            push: false,
            sms: false,
            marketing: false,
          },
          privacy: {
            profileVisibility: "public",
            dataSharing: false,
            analytics: true,
          },
        },
        createdAt: "2023-12-25T10:00:00Z",
        updatedAt: "2023-12-25T10:00:00Z",
      };

      const mockResponse: ApiResponse<User> = {
        success: true,
        data: mockUser,
        message: "User retrieved successfully",
        timestamp: "2023-12-25T10:00:00Z",
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await userService.getCurrentUser();
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith("/api/user/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
    });

    it("should handle API errors", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          error: {
            code: "AUTHENTICATION_ERROR",
            message: "Authentication required",
          },
        }),
      });

      await expect(userService.getCurrentUser()).rejects.toThrow();
    });
  });
});
```

### 2. Hook 测试

#### Hook 测试
```typescript
// hooks/__tests__/useAuth.test.ts
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLogin } from "../useAuth";
import { authService } from "@/services/authService";

// Mock authService
jest.mock("@/services/authService");
const mockAuthService = authService as jest.Mocked<typeof authService>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useLogin", () => {
    it("should login successfully", async () => {
      const mockResponse = {
        success: true,
        data: {
          user: { id: "1", email: "test@example.com", name: "Test User" },
          token: "mock-token",
          refreshToken: "mock-refresh-token",
          expiresIn: 3600,
        },
        message: "Login successful",
        timestamp: "2023-12-25T10:00:00Z",
      };

      mockAuthService.login.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useLogin(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        email: "test@example.com",
        password: "password",
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockAuthService.login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
    });
  });
});
```

## 📚 总结

本后端集成规范文档提供了 Amphi 项目的完整后端集成标准，包括：

1. **API 设计规范**: RESTful API 设计、请求响应格式、版本控制
2. **数据模型定义**: 用户、认证、业务模型类型定义
3. **服务层架构**: 基础服务类、业务服务实现
4. **状态管理**: React Query 集成、全局状态管理
5. **错误处理**: 错误类型定义、错误处理工具、错误边界
6. **认证和授权**: JWT 认证、权限控制、中间件
7. **性能优化**: 请求缓存、数据优化、虚拟滚动
8. **测试策略**: API 测试、Hook 测试、集成测试

遵循这些规范可以确保：
- **API 一致性**: 标准化的 API 设计和响应格式
- **类型安全**: 完整的 TypeScript 类型定义
- **错误处理**: 统一的错误处理和用户反馈
- **性能优化**: 高效的请求和数据管理
- **安全性**: 完善的认证和授权机制
- **可测试性**: 全面的测试覆盖和策略

建议在开发过程中严格遵循这些规范，确保前后端集成的质量和一致性。
