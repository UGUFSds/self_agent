"""
证据文件数据模型
"""

from sqlalchemy import Column, Integer, String, Text, JSON, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import uuid

class Evidence(Base):
    """证据文件模型"""
    
    __tablename__ = "evidences"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # 关联企划
    plan_id = Column(String, ForeignKey("plans.id"), nullable=True)
    
    # 基础信息
    title = Column(String(500), nullable=False, comment="标题")
    url = Column(Text, nullable=False, comment="原始URL")
    summary = Column(Text, nullable=True, comment="摘要")
    
    # 文件信息
    file_key = Column(String(500), nullable=True, comment="文件存储键")
    file_type = Column(String(50), nullable=True, comment="文件类型")
    file_size = Column(Integer, nullable=True, comment="文件大小(字节)")
    
    # 许可信息
    license = Column(String(200), nullable=True, comment="许可信息")
    
    # 评分信息
    relevance_score = Column(Float, default=0.0, comment="相关性评分 0-1")
    authority_score = Column(Float, default=0.0, comment="权威度评分 0-1")
    timeliness_score = Column(Float, default=0.0, comment="时效性评分 0-1")
    
    # 使用情况
    usage_in_plan = Column(JSON, nullable=True, comment="在企划中的使用情况")
    # usage_in_plan 结构: [
    #   {
    #     "plan_id": "uuid",
    #     "section": "string",
    #     "context": "string"
    #   }
    # ]
    
    # 状态
    status = Column(String(50), default="pending", comment="状态: pending, downloaded, processed, failed")
    
    # 关联关系
    plan = relationship("Plan", back_populates="evidences")
    
    def __repr__(self):
        return f"<Evidence(id={self.id}, title={self.title[:50]}...)>"
