"""
应用配置管理
"""

from pydantic_settings import BaseSettings
from typing import List, Optional
import os

class Settings(BaseSettings):
    """应用配置类"""
    
    # 基础配置
    APP_NAME: str = "智能企划生成 Agent"
    VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # 服务器配置
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # 数据库配置
    DATABASE_URL: str = "sqlite:///./planning_agent.db"
    DATABASE_TEST_URL: str = "sqlite:///./planning_agent_test.db"
    
    # Redis配置
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # CORS配置
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",  # Next.js开发服务器
        "http://127.0.0.1:3000",
        "https://your-frontend-domain.com"  # 生产环境前端域名
    ]
    
    # AI模型配置
    AI_MODEL_API_KEY: Optional[str] = None
    AI_MODEL_BASE_URL: str = "https://api.openai.com/v1"
    AI_MODEL_NAME: str = "gpt-3.5-turbo"
    
    # 搜索引擎配置
    GOOGLE_SEARCH_API_KEY: Optional[str] = None
    GOOGLE_SEARCH_ENGINE_ID: Optional[str] = None
    BING_SEARCH_API_KEY: Optional[str] = None
    
    # 文件存储配置
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 50 * 1024 * 1024  # 50MB
    ALLOWED_FILE_TYPES: List[str] = [".pdf", ".doc", ".docx", ".txt", ".html"]
    
    # 安全配置
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM: str = "HS256"
    
    # 日志配置
    LOG_LEVEL: str = "INFO"
    LOG_FILE: str = "logs/app.log"
    
    # 任务队列配置
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/2"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# 创建全局配置实例
settings = Settings()
