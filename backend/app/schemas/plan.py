"""
企划文档相关的Pydantic模式
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class OverviewModel(BaseModel):
    """概览信息模型"""
    title: str = Field(..., description="标题")
    summary: str = Field(..., description="摘要")
    version: str = Field(default="1.0", description="版本")

class ScopeModel(BaseModel):
    """项目范围模型"""
    in: List[str] = Field(..., description="包含范围")
    out: List[str] = Field(..., description="不包含范围")

class MilestoneModel(BaseModel):
    """里程碑模型"""
    id: str = Field(..., description="里程碑ID")
    name: str = Field(..., description="里程碑名称")
    due_date: Optional[str] = Field(None, description="截止日期")
    deliverables: List[str] = Field(default=[], description="交付物")

class TaskModel(BaseModel):
    """任务模型"""
    id: str = Field(..., description="任务ID")
    name: str = Field(..., description="任务名称")
    description: Optional[str] = Field(None, description="任务描述")
    assignee: Optional[str] = Field(None, description="负责人")
    estimated_hours: Optional[float] = Field(None, description="预估工时")

class RACIModel(BaseModel):
    """RACI矩阵模型"""
    task: str = Field(..., description="任务")
    responsible: List[str] = Field(default=[], description="执行者")
    accountable: Optional[str] = Field(None, description="负责人")
    consulted: List[str] = Field(default=[], description="咨询者")
    informed: List[str] = Field(default=[], description="知会者")

class RiskModel(BaseModel):
    """风险模型"""
    id: str = Field(..., description="风险ID")
    description: str = Field(..., description="风险描述")
    probability: str = Field(..., description="发生概率")
    impact: str = Field(..., description="影响程度")
    mitigation: Optional[str] = Field(None, description="应对措施")

class BudgetItemModel(BaseModel):
    """预算项目模型"""
    category: str = Field(..., description="预算类别")
    amount: float = Field(..., description="金额")
    description: Optional[str] = Field(None, description="描述")

class BudgetModel(BaseModel):
    """预算模型"""
    total: float = Field(..., description="总预算")
    breakdown: List[BudgetItemModel] = Field(default=[], description="预算明细")

class PlanBase(BaseModel):
    """企划文档基础模型"""
    overview: OverviewModel = Field(..., description="概览信息")
    scope: ScopeModel = Field(..., description="项目范围")
    milestones: Optional[List[MilestoneModel]] = None
    tasks: Optional[List[TaskModel]] = None
    raci: Optional[List[RACIModel]] = None
    risks: Optional[List[RiskModel]] = None
    budget: Optional[BudgetModel] = None
    references: Optional[List[str]] = None
    evidence_links: Optional[List[str]] = None

class PlanCreate(PlanBase):
    """创建企划文档"""
    requirement_snapshot_id: str = Field(..., description="需求快照ID")

class PlanUpdate(BaseModel):
    """更新企划文档"""
    overview: Optional[OverviewModel] = None
    scope: Optional[ScopeModel] = None
    milestones: Optional[List[MilestoneModel]] = None
    tasks: Optional[List[TaskModel]] = None
    raci: Optional[List[RACIModel]] = None
    risks: Optional[List[RiskModel]] = None
    budget: Optional[BudgetModel] = None
    references: Optional[List[str]] = None
    evidence_links: Optional[List[str]] = None
    status: Optional[str] = None
    completion_score: Optional[int] = Field(None, ge=0, le=100)

class PlanResponse(PlanBase):
    """企划文档响应模型"""
    id: str
    requirement_snapshot_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    status: str = "draft"
    completion_score: int = 0
    
    class Config:
        from_attributes = True

class PlanList(BaseModel):
    """企划文档列表响应"""
    items: List[PlanResponse]
    total: int
    page: int
    size: int
