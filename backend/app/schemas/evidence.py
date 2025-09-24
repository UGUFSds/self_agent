"""
证据文件相关的Pydantic模式
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class EvidenceUsageModel(BaseModel):
    """证据使用情况模型"""
    plan_id: str = Field(..., description="企划ID")
    section: str = Field(..., description="使用章节")
    context: Optional[str] = Field(None, description="使用上下文")

class EvidenceBase(BaseModel):
    """证据文件基础模型"""
    title: str = Field(..., max_length=500, description="标题")
    url: str = Field(..., description="原始URL")
    summary: Optional[str] = Field(None, description="摘要")
    file_type: Optional[str] = Field(None, max_length=50, description="文件类型")
    file_size: Optional[int] = Field(None, description="文件大小(字节)")
    license: Optional[str] = Field(None, max_length=200, description="许可信息")
    usage_in_plan: Optional[List[EvidenceUsageModel]] = None

class EvidenceCreate(EvidenceBase):
    """创建证据"""
    plan_id: Optional[str] = Field(None, description="关联企划ID")

class EvidenceUpdate(BaseModel):
    """更新证据"""
    title: Optional[str] = Field(None, max_length=500)
    summary: Optional[str] = None
    file_type: Optional[str] = Field(None, max_length=50)
    file_size: Optional[int] = None
    license: Optional[str] = Field(None, max_length=200)
    relevance_score: Optional[float] = Field(None, ge=0.0, le=1.0)
    authority_score: Optional[float] = Field(None, ge=0.0, le=1.0)
    timeliness_score: Optional[float] = Field(None, ge=0.0, le=1.0)
    usage_in_plan: Optional[List[EvidenceUsageModel]] = None
    status: Optional[str] = None

class EvidenceResponse(EvidenceBase):
    """证据文件响应模型"""
    id: str
    plan_id: Optional[str] = None
    file_key: Optional[str] = None
    relevance_score: float = 0.0
    authority_score: float = 0.0
    timeliness_score: float = 0.0
    status: str = "pending"
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class EvidenceList(BaseModel):
    """证据文件列表响应"""
    items: List[EvidenceResponse]
    total: int
    page: int
    size: int

class EvidenceSearchRequest(BaseModel):
    """证据搜索请求"""
    query: str = Field(..., description="搜索关键词")
    plan_id: Optional[str] = Field(None, description="关联企划ID")
    max_results: int = Field(default=20, ge=1, le=100, description="最大结果数")
    min_relevance: float = Field(default=0.5, ge=0.0, le=1.0, description="最低相关性")
    sources: Optional[List[str]] = Field(None, description="指定搜索源")

class EvidenceQualityEvaluation(BaseModel):
    """证据质量评估"""
    evidence_id: str
    relevance_score: float
    authority_score: float
    timeliness_score: float
    overall_score: float
    evaluation_notes: Optional[str] = None
    evaluated_at: datetime
