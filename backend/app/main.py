"""
FastAPI Main Application
智能企划生成 Agent 后端服务
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os
from contextlib import asynccontextmanager

# from app.api import requirement, plan, evidence, export
from app.core.config import settings
from app.core.database import init_db
from app.core.logging import setup_logging

# 设置日志
setup_logging()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用启动和关闭时的生命周期管理"""
    # 启动时执行
    await init_db()
    yield
    # 关闭时执行
    pass

# 创建FastAPI应用实例
app = FastAPI(
    title="智能企划生成 Agent API",
    description="基于AI的智能企划生成系统后端服务",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# CORS配置 - 允许前端访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册API路由 (暂时注释掉，等实现服务层后再启用)
# app.include_router(requirement.router, prefix="/api/v1/requirement", tags=["需求澄清"])
# app.include_router(plan.router, prefix="/api/v1/plan", tags=["企划生成"])
# app.include_router(evidence.router, prefix="/api/v1/evidence", tags=["证据检索"])
# app.include_router(export.router, prefix="/api/v1/export", tags=["导出功能"])

@app.get("/")
async def root():
    """根路径健康检查"""
    return {
        "message": "智能企划生成 Agent API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """健康检查端点"""
    return {"status": "healthy", "service": "planning-agent-api"}

# 全局异常处理
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status_code": exc.status_code,
            "path": str(request.url)
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "detail": str(exc) if settings.DEBUG else "Something went wrong",
            "path": str(request.url)
        }
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level="info"
    )
