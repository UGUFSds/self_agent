# Amphi AI Agent Platform - 项目文档

## 📚 文档概览

欢迎来到 Amphi AI Agent Platform 项目文档！这里包含了项目的完整技术规范、开发指南和最佳实践。

## 📋 文档目录

### 🏗️ [项目架构文档](./PROJECT_ARCHITECTURE.md)
- **项目概述**: 技术栈、核心特性、项目结构
- **组件架构**: 组件层次结构、接口规范、核心组件详解
- **开发规范**: 文件命名、导入顺序、组件开发、样式规范
- **后端集成规范**: API类型定义、服务层、状态管理
- **维护指南**: 添加组件、页面、API的具体步骤

### 🧩 [组件详细规范](./COMPONENT_SPECIFICATIONS.md)
- **组件概览**: 组件分类、依赖关系
- **核心组件详解**: CardNav、Orb、FluidGlassInput、StarBorder、ShinyText、LogoLoop
- **组件开发模板**: 基础组件、动画组件、表单组件模板
- **接口定义**: 完整的 TypeScript 类型定义
- **使用示例**: 实际代码使用案例

### 📝 [开发规范和标准](./DEVELOPMENT_STANDARDS.md)
- **代码规范**: TypeScript、React、CSS 编写标准
- **文件组织规范**: 目录结构、文件命名、内容组织
- **命名规范**: 变量、函数、组件、文件命名标准
- **Git 工作流规范**: 分支管理、提交信息、工作流程
- **测试规范**: 测试编写、覆盖率要求、测试策略
- **部署规范**: 环境配置、部署流程、检查清单
- **代码审查规范**: 审查标准、流程、工具

### 🔌 [后端集成规范](./BACKEND_INTEGRATION.md)
- **API 设计规范**: RESTful API 设计、请求响应格式
- **数据模型定义**: 用户、认证、业务模型类型定义
- **服务层架构**: 基础服务类、业务服务实现
- **状态管理**: React Query 集成、全局状态管理
- **错误处理**: 错误类型定义、错误处理工具
- **认证和授权**: JWT 认证、权限控制
- **性能优化**: 请求缓存、数据优化
- **测试策略**: API 测试、Hook 测试

### 🔍 [全局搜索功能指南](./GLOBAL_SEARCH_GUIDE.md)
- **功能概述**: 全局搜索的核心特性和用途
- **使用方式**: 激活方式、键盘导航、搜索技巧
- **搜索内容**: 文档、组件、API、页面等类型
- **界面设计**: 搜索框、结果展示、视觉反馈
- **技术实现**: 组件结构、搜索逻辑、事件处理
- **响应式设计**: 桌面端和移动端适配
- **使用场景**: 快速导航、内容发现、开发调试
- **未来扩展**: 搜索历史、建议、高级搜索

## 🚀 快速开始

### 1. 项目设置
```bash
# 克隆项目
git clone <repository-url>
cd agent

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 2. 开发流程
```bash
# 创建功能分支
git checkout -b feature/your-feature

# 开发功能
# ... 编写代码 ...

# 运行检查
npm run type-check
npm run lint
npm run test

# 提交更改
git add .
git commit -m "feat: add your feature"

# 推送分支
git push origin feature/your-feature
```

### 3. 构建和部署
```bash
# 构建项目
npm run build

# 导出静态文件
npm run export

# 部署到 Cloudflare Pages
# 构建命令: npm run build
# 输出目录: out
```

## 📖 文档使用指南

### 新开发者入门
1. **阅读项目架构文档**: 了解项目整体结构和技术栈
2. **查看组件规范**: 熟悉现有组件和开发模式
3. **学习开发规范**: 掌握代码编写和提交标准
4. **了解后端集成**: 学习 API 调用和状态管理

### 日常开发参考
- **组件开发**: 参考组件规范文档和开发模板
- **API 集成**: 使用后端集成规范中的服务层架构
- **代码提交**: 遵循 Git 工作流规范
- **问题排查**: 查看错误处理和测试策略

### 项目维护
- **添加新功能**: 参考维护指南中的具体步骤
- **代码审查**: 使用代码审查规范检查代码质量
- **性能优化**: 参考性能优化最佳实践
- **测试覆盖**: 确保测试覆盖率达标

## 🔧 工具和配置

### 开发工具
- **代码编辑器**: VS Code (推荐)
- **浏览器**: Chrome/Edge (支持现代 JavaScript)
- **Git**: 版本控制
- **Node.js**: 运行环境 (v18+)

### 推荐 VS Code 扩展
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### 项目配置
- **TypeScript**: 严格模式，完整类型检查
- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **Tailwind CSS**: 原子化 CSS 框架

## 📊 项目统计

### 技术栈
- **前端框架**: Next.js 15.5.2
- **UI 库**: React 19.1.0
- **类型系统**: TypeScript 5.9.2
- **样式框架**: Tailwind CSS v4
- **动画库**: GSAP 3.13.0
- **3D 渲染**: OGL 1.0.11

### 项目结构
- **组件数量**: 6 个核心组件
- **页面数量**: 1 个主页面
- **类型定义**: 5 个类型文件
- **常量配置**: 3 个配置文件
- **文档数量**: 4 个规范文档

### 代码质量
- **TypeScript 覆盖率**: 100%
- **ESLint 规则**: 严格模式
- **代码格式化**: Prettier 自动格式化
- **构建状态**: 通过所有检查

## 🤝 贡献指南

### 贡献流程
1. **Fork 项目**: 创建项目分支
2. **创建功能分支**: `git checkout -b feature/your-feature`
3. **遵循开发规范**: 按照文档标准编写代码
4. **运行测试**: 确保所有测试通过
5. **提交 PR**: 创建 Pull Request
6. **代码审查**: 等待审查和反馈
7. **合并代码**: 审查通过后合并

### 贡献要求
- **代码质量**: 符合项目规范
- **测试覆盖**: 新功能需要测试
- **文档更新**: 更新相关文档
- **类型安全**: 完整的 TypeScript 类型
- **性能考虑**: 不影响现有性能

## 📞 支持和反馈

### 问题报告
- **Bug 报告**: 使用 GitHub Issues
- **功能请求**: 使用 GitHub Discussions
- **安全问题**: 发送邮件到安全邮箱

### 社区支持
- **技术讨论**: GitHub Discussions
- **代码审查**: Pull Request 评论
- **文档改进**: 提交文档 PR

## 📄 许可证

本项目采用 MIT 许可证。详情请查看 [LICENSE](../LICENSE) 文件。

## 🙏 致谢

感谢所有为 Amphi AI Agent Platform 项目做出贡献的开发者！

---

**最后更新**: 2024年12月25日  
**文档版本**: v1.0.0  
**项目版本**: v0.1.0
