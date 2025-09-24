"""
企划文档数据模型
"""

from sqlalchemy import Column, Integer, String, Text, JSON, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import uuid

class Plan(Base):
    """企划文档模型"""
    
    __tablename__ = "plans"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # 关联需求快照
    requirement_snapshot_id = Column(String, ForeignKey("requirement_snapshots.id"), nullable=False)
    
    # 基础信息
    overview = Column(JSON, nullable=False, comment="概览信息")
    # overview 结构: {
    #   "title": "string",
    #   "summary": "string", 
    #   "version": "string"
    # }
    
    # 范围和目标
    scope = Column(JSON, nullable=False, comment="项目范围")
    # scope 结构: {
    #   "in": ["string"],
    #   "out": ["string"]
    # }
    
    # 执行计划
    milestones = Column(JSON, nullable=True, comment="里程碑")
    tasks = Column(JSON, nullable=True, comment="任务列表")
    
    # 组织架构
    raci = Column(JSON, nullable=True, comment="RACI矩阵")
    
    # 风险管理
    risks = Column(JSON, nullable=True, comment="风险列表")
    
    # 预算信息
    budget = Column(JSON, nullable=True, comment="预算信息")
    
    # 参考资料
    references = Column(JSON, nullable=True, comment="参考资料")
    evidence_links = Column(JSON, nullable=True, comment="证据链接")
    
    # 状态信息
    status = Column(String(50), default="draft", comment="状态: draft, generating, completed, archived")
    completion_score = Column(Integer, default=0, comment="完成度评分 0-100")
    
    # 关联关系
    requirement_snapshot = relationship("RequirementSnapshot", back_populates="plans")
    evidences = relationship("Evidence", back_populates="plan", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Plan(id={self.id}, title={self.overview.get('title', 'Untitled') if self.overview else 'Untitled'})>"
