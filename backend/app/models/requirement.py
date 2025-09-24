"""
需求快照数据模型
"""

from sqlalchemy import Column, Integer, String, Text, JSON, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import uuid

class RequirementSnapshot(Base):
    """需求快照模型"""
    
    __tablename__ = "requirement_snapshots"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # 基础信息
    problem_statement = Column(Text, nullable=False, comment="问题陈述")
    objectives = Column(JSON, nullable=False, comment="目标列表")
    
    # 约束条件
    constraints = Column(JSON, nullable=True, comment="约束条件")
    # constraints 结构: {
    #   "time": "string",
    #   "budget": "number", 
    #   "compliance": ["string"],
    #   "resources": ["string"]
    # }
    
    # 受众和偏好
    audience = Column(String(500), nullable=True, comment="目标受众")
    quality_metrics = Column(JSON, nullable=True, comment="质量标准")
    deliverable_formats = Column(JSON, nullable=True, comment="交付格式")
    
    # 用户偏好
    user_preferences = Column(JSON, nullable=True, comment="用户偏好")
    # user_preferences 结构: {
    #   "style": "string",
    #   "detail_level": "string", 
    #   "risk_tolerance": "string"
    # }
    
    # 关联关系
    plans = relationship("Plan", back_populates="requirement_snapshot", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<RequirementSnapshot(id={self.id}, problem={self.problem_statement[:50]}...)>"
