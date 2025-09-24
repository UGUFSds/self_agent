"""
需求快照相关的Pydantic模式
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class ConstraintsModel(BaseModel):
    """约束条件模型"""
    time: Optional[str] = None
    budget: Optional[float] = None
    compliance: Optional[List[str]] = None
    resources: Optional[List[str]] = None

class UserPreferencesModel(BaseModel):
    """用户偏好模型"""
    style: Optional[str] = None
    detail_level: Optional[str] = None
    risk_tolerance: Optional[str] = None

class RequirementSnapshotBase(BaseModel):
    """需求快照基础模型"""
    problem_statement: str = Field(..., description="问题陈述")
    objectives: List[str] = Field(..., description="目标列表")
    constraints: Optional[ConstraintsModel] = None
    audience: Optional[str] = Field(None, max_length=500, description="目标受众")
    quality_metrics: Optional[List[str]] = None
    deliverable_formats: Optional[List[str]] = None
    user_preferences: Optional[UserPreferencesModel] = None

class RequirementSnapshotCreate(RequirementSnapshotBase):
    """创建需求快照"""
    pass

class RequirementSnapshotUpdate(BaseModel):
    """更新需求快照"""
    problem_statement: Optional[str] = None
    objectives: Optional[List[str]] = None
    constraints: Optional[ConstraintsModel] = None
    audience: Optional[str] = None
    quality_metrics: Optional[List[str]] = None
    deliverable_formats: Optional[List[str]] = None
    user_preferences: Optional[UserPreferencesModel] = None

class RequirementSnapshotResponse(RequirementSnapshotBase):
    """需求快照响应模型"""
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class RequirementSnapshotList(BaseModel):
    """需求快照列表响应"""
    items: List[RequirementSnapshotResponse]
    total: int
    page: int
    size: int
