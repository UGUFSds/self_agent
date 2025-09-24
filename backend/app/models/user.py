"""
用户数据模型
"""

from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from app.core.database import Base
import uuid

class User(Base):
    """用户模型"""
    
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # 基础信息
    username = Column(String(100), unique=True, nullable=True, comment="用户名")
    email = Column(String(255), unique=True, nullable=True, comment="邮箱")
    
    # 状态信息
    is_active = Column(Boolean, default=True, comment="是否激活")
    is_verified = Column(Boolean, default=False, comment="是否已验证")
    
    # 偏好设置
    preferences = Column(String, nullable=True, comment="用户偏好设置(JSON)")
    
    def __repr__(self):
        return f"<User(id={self.id}, username={self.username})>"
