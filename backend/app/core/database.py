"""
数据库配置和连接管理
"""

from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
# import redis
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

# SQLAlchemy配置
engine = create_engine(
    settings.DATABASE_URL,
    poolclass=StaticPool,
    connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {},
    echo=settings.DEBUG
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 创建基础模型类
Base = declarative_base()

# Redis连接 (暂时注释掉)
# redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)
redis_client = None

async def get_db():
    """获取数据库会话"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_redis():
    """获取Redis客户端"""
    return redis_client

async def init_db():
    """初始化数据库"""
    try:
        # 创建所有表
        Base.metadata.create_all(bind=engine)
        logger.info("Database initialized successfully")
        
        # 测试Redis连接 (暂时跳过)
        # redis_client.ping()
        # logger.info("Redis connected successfully")
        logger.info("Database initialized (Redis skipped)")
        
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        raise

async def close_db():
    """关闭数据库连接"""
    try:
        engine.dispose()
        # redis_client.close()
        logger.info("Database connections closed")
    except Exception as e:
        logger.error(f"Error closing database connections: {e}")
