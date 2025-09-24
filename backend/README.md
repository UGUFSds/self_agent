# 智能企划生成 Agent 后端服务

基于 FastAPI + Python 的智能企划生成系统后端服务。

## 技术栈

- **框架**: FastAPI 0.104.1
- **数据库**: PostgreSQL + SQLAlchemy
- **缓存**: Redis
- **任务队列**: Celery
- **AI集成**: OpenAI API / 本地模型
- **文档**: 自动生成 Swagger/OpenAPI 文档

## 项目结构

```
backend/
├── app/
│   ├── main.py                 # FastAPI应用入口
│   ├── api/                    # API路由
│   │   ├── requirement.py      # 需求澄清API
│   │   ├── plan.py            # 企划生成API
│   │   ├── evidence.py        # 证据检索API
│   │   └── export.py          # 导出功能API
│   ├── core/                   # 核心配置
│   │   ├── config.py          # 应用配置
│   │   ├── database.py        # 数据库配置
│   │   └── logging.py         # 日志配置
│   ├── models/                 # 数据模型
│   │   ├── requirement.py     # 需求快照模型
│   │   ├── plan.py           # 企划文档模型
│   │   ├── evidence.py       # 证据文件模型
│   │   └── user.py           # 用户模型
│   ├── schemas/                # Pydantic模式
│   │   ├── requirement.py     # 需求快照模式
│   │   ├── plan.py           # 企划文档模式
│   │   └── evidence.py       # 证据文件模式
│   └── services/               # 业务逻辑服务
│       ├── requirement_service.py
│       ├── plan_service.py
│       ├── evidence_service.py
│       └── export_service.py
├── requirements.txt            # Python依赖
├── docker-compose.yml         # Docker编排
├── Dockerfile                 # Docker镜像
└── env.example               # 环境变量示例
```

## 快速开始

### 1. 环境准备

确保已安装：
- Python 3.11+
- PostgreSQL 15+
- Redis 7+

### 2. 安装依赖

```bash
cd backend
pip install -r requirements.txt
```

### 3. 环境配置

```bash
# 复制环境变量文件
cp env.example .env

# 编辑配置文件
vim .env
```

### 4. 数据库初始化

```bash
# 创建数据库
createdb planning_agent

# 运行数据库迁移（待实现）
alembic upgrade head
```

### 5. 启动服务

```bash
# 开发模式启动
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 6. 使用Docker（推荐）

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f api
```

## API文档

启动服务后访问：
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 核心API端点

### 需求澄清
- `POST /api/v1/requirement/` - 创建需求快照
- `GET /api/v1/requirement/{id}` - 获取需求快照
- `PUT /api/v1/requirement/{id}` - 更新需求快照

### 企划生成
- `POST /api/v1/plan/` - 创建企划文档
- `POST /api/v1/plan/{id}/generate` - 生成企划内容
- `GET /api/v1/plan/{id}/status` - 获取生成状态

### 证据检索
- `POST /api/v1/evidence/search` - 搜索证据
- `GET /api/v1/evidence/{id}` - 获取证据详情
- `POST /api/v1/evidence/{id}/download` - 下载证据文件

### 导出功能
- `POST /api/v1/export/plan/{id}/pdf` - 导出PDF
- `POST /api/v1/export/plan/{id}/docx` - 导出DOCX
- `POST /api/v1/export/plan/{id}/package` - 导出完整包

## 开发指南

### 代码风格

```bash
# 代码格式化
black app/
isort app/

# 类型检查
mypy app/

# 代码检查
flake8 app/
```

### 测试

```bash
# 运行测试
pytest

# 测试覆盖率
pytest --cov=app
```

### 数据库迁移

```bash
# 创建迁移文件
alembic revision --autogenerate -m "描述"

# 执行迁移
alembic upgrade head

# 回滚迁移
alembic downgrade -1
```

## 部署

### 生产环境配置

1. 设置环境变量：
```bash
export DEBUG=false
export DATABASE_URL=postgresql://user:pass@host:5432/db
export SECRET_KEY=your-production-secret-key
```

2. 使用Gunicorn启动：
```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Docker部署

```bash
# 构建镜像
docker build -t planning-agent-api .

# 运行容器
docker run -p 8000:8000 --env-file .env planning-agent-api
```

## 监控和日志

- 日志文件：`logs/app.log`
- 健康检查：`GET /health`
- 应用状态：`GET /`

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查PostgreSQL服务是否启动
   - 验证DATABASE_URL配置

2. **Redis连接失败**
   - 检查Redis服务是否启动
   - 验证REDIS_URL配置

3. **AI模型调用失败**
   - 检查API密钥配置
   - 验证网络连接

## 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 创建Pull Request

## 许可证

MIT License
