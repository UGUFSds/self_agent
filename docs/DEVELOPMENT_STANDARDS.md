# 开发规范和标准文档

## 📋 目录
- [代码规范](#代码规范)
- [文件组织规范](#文件组织规范)
- [命名规范](#命名规范)
- [Git 工作流规范](#git-工作流规范)
- [测试规范](#测试规范)
- [部署规范](#部署规范)
- [代码审查规范](#代码审查规范)

## 📝 代码规范

### 1. TypeScript 规范

#### 类型定义规范
```typescript
// ✅ 正确：使用接口定义对象类型
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// ✅ 正确：使用类型别名定义联合类型
type Status = "pending" | "approved" | "rejected";

// ✅ 正确：使用泛型提高复用性
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// ❌ 错误：使用 any 类型
const data: any = response.data;

// ✅ 正确：使用具体类型或 unknown
const data: User = response.data;
const data: unknown = response.data;
```

#### 函数定义规范
```typescript
// ✅ 正确：明确的参数和返回值类型
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ 正确：使用箭头函数
const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ✅ 正确：异步函数
async function fetchUser(id: string): Promise<User> {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

// ❌ 错误：缺少类型注解
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

#### 组件 Props 规范
```typescript
// ✅ 正确：扩展标准接口
interface CustomComponentProps extends StandardComponentProps {
  customProp: string;
  optionalProp?: number;
}

// ✅ 正确：使用默认值
const CustomComponent: React.FC<CustomComponentProps> = ({
  customProp,
  optionalProp = 0,
  className = "",
  ...props
}) => {
  // 组件实现
};

// ❌ 错误：直接定义 Props
interface CustomComponentProps {
  onClick: () => void;
  className: string;
  // 缺少标准属性
}
```

### 2. React 规范

#### 组件定义规范
```typescript
// ✅ 正确：函数组件
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

// ✅ 正确：使用 React.FC 类型
const MyComponent: React.FC<MyComponentProps> = (props) => {
  // 组件实现
};

// ❌ 错误：不使用类型注解
const MyComponent = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};
```

#### Hooks 使用规范
```typescript
// ✅ 正确：Hooks 在组件顶部
const MyComponent: React.FC<Props> = ({ data }) => {
  const [state, setState] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  
  const memoizedValue = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);
  
  useEffect(() => {
    // 副作用逻辑
  }, [dependency]);
  
  return <div>{state}</div>;
};

// ❌ 错误：Hooks 在条件语句中
const MyComponent: React.FC<Props> = ({ condition }) => {
  if (condition) {
    const [state, setState] = useState(initialValue); // 错误
  }
  
  return <div>Content</div>;
};
```

#### 事件处理规范
```typescript
// ✅ 正确：使用 useCallback 优化性能
const MyComponent: React.FC<Props> = ({ onItemClick }) => {
  const handleClick = useCallback((id: string) => {
    onItemClick?.(id);
  }, [onItemClick]);
  
  return <button onClick={() => handleClick("item-id")}>Click</button>;
};

// ✅ 正确：事件处理器类型安全
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // 处理表单提交
};

// ❌ 错误：直接传递函数
<button onClick={onItemClick}>Click</button> // 可能导致性能问题
```

### 3. CSS 和样式规范

#### Tailwind CSS 使用规范
```typescript
// ✅ 正确：使用常量配置
className={LAYOUT_CONFIG.container.className}

// ✅ 正确：条件样式
className={cn(
  "base-classes",
  isActive && "active-classes",
  disabled && "disabled-classes",
  className
)}

// ✅ 正确：响应式设计
className="w-full md:w-1/2 lg:w-1/3"

// ❌ 错误：硬编码样式
className="min-h-screen bg-black flex items-center justify-center"
```

#### 内联样式规范
```typescript
// ✅ 正确：使用常量
style={{ backgroundColor: LAYOUT_CONFIG.container.backgroundColor }}

// ✅ 正确：动态样式
style={{ 
  transform: `translateX(${offset}px)`,
  opacity: isVisible ? 1 : 0
}}

// ❌ 错误：硬编码值
style={{ backgroundColor: "#000000" }}
```

### 4. 导入和导出规范

#### 导入顺序
```typescript
// 1. React 相关
import React, { useState, useEffect } from "react";
import { NextPage } from "next";

// 2. 第三方库
import { gsap } from "gsap";
import { SiReact } from "react-icons/si";

// 3. 内部组件
import CardNav from "@/components/CardNav";
import CustomButton from "@/components/CustomButton";

// 4. 常量和类型
import { NAV_ITEMS } from "@/constants/navigation";
import { User, ApiResponse } from "@/types";

// 5. 工具函数
import { cn } from "@/lib/utils";

// 6. 样式
import "./styles.css";
```

#### 导出规范
```typescript
// ✅ 正确：默认导出组件
const MyComponent: React.FC<Props> = () => {
  return <div>Content</div>;
};

export default MyComponent;

// ✅ 正确：命名导出类型和常量
export interface MyComponentProps {
  // 类型定义
}

export const MY_CONSTANT = "value";

// ✅ 正确：重新导出
export { default as CardNav } from "./CardNav";
export { default as CustomButton } from "./CustomButton";
```

## 📁 文件组织规范

### 1. 目录结构规范

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页面
│   └── [feature]/         # 功能页面
│       └── page.tsx
├── components/            # 组件库
│   ├── ui/               # 基础UI组件
│   ├── layout/           # 布局组件
│   ├── forms/            # 表单组件
│   └── [feature]/        # 功能组件
├── constants/            # 常量配置
│   ├── api.ts           # API配置
│   ├── ui.ts            # UI配置
│   └── [feature].ts     # 功能配置
├── types/               # 类型定义
│   ├── api.ts          # API类型
│   ├── components.ts   # 组件类型
│   └── [feature].ts    # 功能类型
├── services/           # 服务层
│   ├── api.ts         # API服务
│   └── [feature].ts   # 功能服务
├── hooks/             # 自定义Hooks
│   ├── useApi.ts     # API Hook
│   └── use[Feature].ts # 功能Hook
├── utils/             # 工具函数
│   ├── helpers.ts    # 辅助函数
│   └── [feature].ts  # 功能工具
└── styles/            # 样式文件
    ├── globals.css   # 全局样式
    └── [feature].css # 功能样式
```

### 2. 文件命名规范

#### 组件文件
```typescript
// ✅ 正确：PascalCase
CardNav.tsx
UserProfile.tsx
CustomButton.tsx

// ❌ 错误：其他命名方式
cardNav.tsx
user-profile.tsx
custom_button.tsx
```

#### 工具文件
```typescript
// ✅ 正确：camelCase
apiService.ts
userHelpers.ts
dateUtils.ts

// ❌ 错误：其他命名方式
ApiService.ts
user-helpers.ts
date_utils.ts
```

#### 类型文件
```typescript
// ✅ 正确：camelCase
apiTypes.ts
userTypes.ts
componentTypes.ts

// ❌ 错误：其他命名方式
ApiTypes.ts
user-types.ts
component_types.ts
```

#### 常量文件
```typescript
// ✅ 正确：camelCase
apiConstants.ts
uiConstants.ts
userConstants.ts

// ❌ 错误：其他命名方式
ApiConstants.ts
ui-constants.ts
user_constants.ts
```

### 3. 文件内容组织

#### 组件文件结构
```typescript
// 1. 导入语句
import React from "react";
import { ComponentProps } from "@/types";

// 2. 类型定义
interface MyComponentProps extends ComponentProps {
  // 组件特定属性
}

// 3. 组件实现
const MyComponent: React.FC<MyComponentProps> = (props) => {
  // 状态定义
  // 事件处理器
  // 渲染逻辑
  return <div>Content</div>;
};

// 4. 导出
export default MyComponent;
```

#### 服务文件结构
```typescript
// 1. 导入语句
import { ApiResponse } from "@/types";

// 2. 类型定义
interface ServiceConfig {
  // 配置类型
}

// 3. 服务类
class MyService {
  // 私有属性
  // 构造函数
  // 公共方法
}

// 4. 实例导出
export const myService = new MyService();
```

## 🏷️ 命名规范

### 1. 变量命名

#### 基本变量
```typescript
// ✅ 正确：camelCase
const userName = "john";
const isLoggedIn = true;
const userCount = 100;

// ❌ 错误：其他命名方式
const user_name = "john";
const IsLoggedIn = true;
const user_count = 100;
```

#### 常量
```typescript
// ✅ 正确：UPPER_SNAKE_CASE
const API_BASE_URL = "https://api.example.com";
const MAX_RETRY_COUNT = 3;
const DEFAULT_TIMEOUT = 5000;

// ❌ 错误：其他命名方式
const apiBaseUrl = "https://api.example.com";
const maxRetryCount = 3;
const defaultTimeout = 5000;
```

#### 函数
```typescript
// ✅ 正确：camelCase，动词开头
const getUserById = (id: string) => { };
const calculateTotal = (items: Item[]) => { };
const isValidEmail = (email: string) => { };

// ❌ 错误：其他命名方式
const GetUserById = (id: string) => { };
const userById = (id: string) => { };
const get_user_by_id = (id: string) => { };
```

### 2. 组件命名

#### 组件名称
```typescript
// ✅ 正确：PascalCase
const UserProfile = () => { };
const CustomButton = () => { };
const DataTable = () => { };

// ❌ 错误：其他命名方式
const userProfile = () => { };
const custom_button = () => { };
const DataTable = () => { };
```

#### Props 命名
```typescript
// ✅ 正确：camelCase
interface UserProfileProps {
  userName: string;
  isActive: boolean;
  onUserClick: (id: string) => void;
}

// ❌ 错误：其他命名方式
interface UserProfileProps {
  user_name: string;
  IsActive: boolean;
  on_user_click: (id: string) => void;
}
```

### 3. 文件命名

#### 页面文件
```typescript
// ✅ 正确：kebab-case
user-profile/page.tsx
settings/account/page.tsx
dashboard/analytics/page.tsx

// ❌ 错误：其他命名方式
UserProfile/page.tsx
settings/Account/page.tsx
dashboard/analytics/page.tsx
```

#### 组件文件
```typescript
// ✅ 正确：PascalCase
UserProfile.tsx
CustomButton.tsx
DataTable.tsx

// ❌ 错误：其他命名方式
userProfile.tsx
custom-button.tsx
data_table.tsx
```

## 🔄 Git 工作流规范

### 1. 分支命名规范

#### 功能分支
```bash
# ✅ 正确：feature/功能描述
feature/user-authentication
feature/payment-integration
feature/dashboard-analytics

# ❌ 错误：其他命名方式
feature/userAuthentication
feature/payment_integration
feature/dashboard-analytics
```

#### 修复分支
```bash
# ✅ 正确：fix/问题描述
fix/login-validation-error
fix/payment-gateway-timeout
fix/mobile-responsive-issue

# ❌ 错误：其他命名方式
fix/loginValidationError
fix/payment_gateway_timeout
fix/mobileResponsiveIssue
```

#### 发布分支
```bash
# ✅ 正确：release/版本号
release/v1.0.0
release/v1.1.0
release/v2.0.0

# ❌ 错误：其他命名方式
release/1.0.0
release/v1.0.0-beta
release/version-1.0.0
```

### 2. 提交信息规范

#### 提交信息格式
```bash
# 格式：<类型>(<范围>): <描述>
# 类型：feat, fix, docs, style, refactor, test, chore
# 范围：影响的模块或功能
# 描述：简洁明了的描述

# ✅ 正确：功能添加
feat(auth): add user login functionality
feat(dashboard): implement analytics charts
feat(api): add user profile endpoints

# ✅ 正确：问题修复
fix(login): resolve validation error on empty fields
fix(ui): correct mobile responsive layout
fix(api): handle network timeout errors

# ✅ 正确：文档更新
docs(readme): update installation instructions
docs(api): add endpoint documentation
docs(components): update component usage examples

# ✅ 正确：代码重构
refactor(components): extract common button logic
refactor(api): optimize database queries
refactor(utils): improve error handling

# ✅ 正确：样式调整
style(components): fix button hover effects
style(layout): adjust spacing and alignment
style(forms): improve input field styling

# ✅ 正确：测试相关
test(components): add unit tests for Button component
test(api): add integration tests for user endpoints
test(utils): add tests for helper functions

# ✅ 正确：构建和工具
chore(deps): update dependencies to latest versions
chore(config): update ESLint configuration
chore(build): optimize webpack configuration
```

#### 提交信息示例
```bash
# 功能开发
feat(auth): add OAuth2 login with Google
feat(dashboard): implement real-time data updates
feat(api): add pagination support for user list

# 问题修复
fix(login): handle expired token gracefully
fix(ui): resolve z-index conflicts in modal
fix(api): fix memory leak in long-running requests

# 文档更新
docs(readme): add deployment instructions
docs(api): document new authentication endpoints
docs(components): add prop documentation

# 代码重构
refactor(components): extract reusable form components
refactor(api): implement repository pattern
refactor(utils): optimize date formatting functions

# 样式调整
style(components): improve button accessibility
style(layout): fix mobile navigation menu
style(forms): enhance input field focus states

# 测试相关
test(components): add accessibility tests
test(api): add performance benchmarks
test(utils): add edge case coverage

# 构建和工具
chore(deps): upgrade React to v18
chore(config): update TypeScript configuration
chore(build): optimize bundle size
```

### 3. 工作流程

#### 开发流程
```bash
# 1. 创建功能分支
git checkout -b feature/user-authentication

# 2. 开发功能
# ... 编写代码 ...

# 3. 提交更改
git add .
git commit -m "feat(auth): add user login form"

# 4. 推送分支
git push origin feature/user-authentication

# 5. 创建 Pull Request
# 在 GitHub 上创建 PR

# 6. 代码审查
# 等待审查和反馈

# 7. 合并到主分支
# 审查通过后合并
```

#### 发布流程
```bash
# 1. 创建发布分支
git checkout -b release/v1.0.0

# 2. 更新版本号
# 更新 package.json 中的版本号

# 3. 更新 CHANGELOG
# 记录新功能和修复

# 4. 提交更改
git add .
git commit -m "chore(release): bump version to v1.0.0"

# 5. 创建标签
git tag -a v1.0.0 -m "Release version 1.0.0"

# 6. 推送标签
git push origin v1.0.0

# 7. 合并到主分支
git checkout main
git merge release/v1.0.0
git push origin main
```

## 🧪 测试规范

### 1. 测试文件组织

#### 测试文件结构
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.stories.tsx
│   └── Card/
│       ├── Card.tsx
│       ├── Card.test.tsx
│       └── Card.stories.tsx
├── services/
│   ├── apiService.ts
│   └── apiService.test.ts
├── utils/
│   ├── helpers.ts
│   └── helpers.test.ts
└── __tests__/
    ├── setup.ts
    └── utils.ts
```

#### 测试文件命名
```typescript
// ✅ 正确：组件测试
Button.test.tsx
UserProfile.test.tsx
DataTable.test.tsx

// ✅ 正确：服务测试
apiService.test.ts
userService.test.ts
authService.test.ts

// ✅ 正确：工具测试
helpers.test.ts
dateUtils.test.ts
validation.test.ts

// ❌ 错误：其他命名方式
Button.spec.tsx
userProfile.test.ts
data_table.test.ts
```

### 2. 测试编写规范

#### 组件测试
```typescript
// Button.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies correct variant styles", () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByText("Primary");
    expect(button).toHaveClass("bg-blue-500");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText("Disabled");
    expect(button).toBeDisabled();
  });
});
```

#### 服务测试
```typescript
// apiService.test.ts
import { apiService } from "./apiService";
import { ApiResponse } from "@/types";

// Mock fetch
global.fetch = jest.fn();

describe("ApiService", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("makes GET request correctly", async () => {
    const mockResponse: ApiResponse<User> = {
      success: true,
      data: { id: "1", name: "John" },
      message: "Success"
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const result = await apiService.get<User>("/users/1");
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith("/api/users/1", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
  });

  it("handles API errors correctly", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Not found" })
    });

    await expect(apiService.get("/users/999")).rejects.toThrow();
  });
});
```

#### 工具函数测试
```typescript
// helpers.test.ts
import { formatDate, validateEmail, debounce } from "./helpers";

describe("Helper Functions", () => {
  describe("formatDate", () => {
    it("formats date correctly", () => {
      const date = new Date("2023-12-25");
      expect(formatDate(date)).toBe("2023-12-25");
    });

    it("handles invalid date", () => {
      expect(formatDate(new Date("invalid"))).toBe("Invalid Date");
    });
  });

  describe("validateEmail", () => {
    it("validates correct email", () => {
      expect(validateEmail("test@example.com")).toBe(true);
    });

    it("rejects invalid email", () => {
      expect(validateEmail("invalid-email")).toBe(false);
    });
  });

  describe("debounce", () => {
    it("debounces function calls", (done) => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1);
        done();
      }, 150);
    });
  });
});
```

### 3. 测试覆盖率要求

#### 覆盖率目标
- **组件测试**: 80% 以上
- **服务测试**: 90% 以上
- **工具函数测试**: 95% 以上
- **整体覆盖率**: 85% 以上

#### 覆盖率检查
```bash
# 运行测试并生成覆盖率报告
npm run test:coverage

# 查看覆盖率报告
open coverage/lcov-report/index.html
```

## 🚀 部署规范

### 1. 环境配置

#### 环境变量
```bash
# .env.local (本地开发)
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Amphi
NEXT_PUBLIC_APP_VERSION=1.0.0

# .env.production (生产环境)
NEXT_PUBLIC_API_URL=https://api.amphi.com
NEXT_PUBLIC_APP_NAME=Amphi
NEXT_PUBLIC_APP_VERSION=1.0.0
```

#### 构建配置
```typescript
// next.config.ts
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION
  }
};

export default nextConfig;
```

### 2. 部署流程

#### 本地构建
```bash
# 安装依赖
npm install

# 运行测试
npm run test

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 构建项目
npm run build

# 导出静态文件
npm run export
```

#### 部署到 Cloudflare Pages
```bash
# 构建命令
npm run build

# 输出目录
out

# 环境变量
NEXT_PUBLIC_API_URL=https://api.amphi.com
NEXT_PUBLIC_APP_NAME=Amphi
```

### 3. 部署检查清单

#### 部署前检查
- [ ] 所有测试通过
- [ ] 类型检查通过
- [ ] 代码检查通过
- [ ] 构建成功
- [ ] 环境变量配置正确
- [ ] 版本号已更新
- [ ] CHANGELOG 已更新

#### 部署后检查
- [ ] 网站可正常访问
- [ ] 所有功能正常工作
- [ ] 性能指标正常
- [ ] 错误监控正常
- [ ] 用户反馈正常

## 👥 代码审查规范

### 1. 审查标准

#### 代码质量
- [ ] 代码符合项目规范
- [ ] 类型定义完整
- [ ] 错误处理完善
- [ ] 性能优化合理
- [ ] 安全性考虑充分

#### 功能完整性
- [ ] 功能实现完整
- [ ] 边界情况处理
- [ ] 用户体验良好
- [ ] 响应式设计正确
- [ ] 无障碍性支持

#### 测试覆盖
- [ ] 单元测试完整
- [ ] 集成测试覆盖
- [ ] 测试用例合理
- [ ] 覆盖率达标
- [ ] 测试可维护

### 2. 审查流程

#### 创建 Pull Request
```markdown
## 功能描述
简要描述本次更改的功能

## 更改类型
- [ ] 新功能
- [ ] 问题修复
- [ ] 代码重构
- [ ] 文档更新
- [ ] 样式调整
- [ ] 测试相关
- [ ] 构建和工具

## 测试说明
描述如何测试这些更改

## 检查清单
- [ ] 代码符合项目规范
- [ ] 类型定义完整
- [ ] 测试覆盖充分
- [ ] 文档已更新
- [ ] 无控制台错误
- [ ] 响应式设计正确
```

#### 审查反馈
```markdown
## 审查结果
- [ ] 通过
- [ ] 需要修改
- [ ] 需要讨论

## 反馈意见
### 代码质量
- 具体问题和建议

### 功能实现
- 功能完整性评估

### 测试覆盖
- 测试建议

## 后续行动
- 需要修改的问题
- 建议的改进方向
```

### 3. 审查工具

#### 自动化检查
```bash
# 代码质量检查
npm run lint
npm run type-check
npm run test

# 构建检查
npm run build

# 性能检查
npm run analyze
```

#### 手动检查
- 代码逻辑正确性
- 用户体验评估
- 安全性审查
- 性能影响评估
- 文档完整性

## 📚 总结

本开发规范文档涵盖了 Amphi 项目的完整开发标准，包括：

1. **代码规范**: TypeScript、React、CSS 编写标准
2. **文件组织**: 目录结构和文件命名规范
3. **命名规范**: 变量、函数、组件命名标准
4. **Git 工作流**: 分支管理和提交信息规范
5. **测试规范**: 测试编写和覆盖率要求
6. **部署规范**: 环境配置和部署流程
7. **代码审查**: 审查标准和流程

遵循这些规范可以确保：
- **代码一致性**: 团队成员遵循相同的开发标准
- **质量保证**: 通过自动化检查和人工审查确保代码质量
- **可维护性**: 清晰的架构和规范便于后续维护
- **团队协作**: 标准化的流程提高团队效率

建议在开发过程中严格遵循这些规范，并在需要时及时更新文档。
