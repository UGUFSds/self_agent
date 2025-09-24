"""
证据检索相关API路由
"""

from fastapi import APIRouter, Depends, HTTPException, Query, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.schemas.evidence import (
    EvidenceCreate,
    EvidenceUpdate,
    EvidenceResponse,
    EvidenceList,
    EvidenceSearchRequest
)
from app.services.evidence_service import EvidenceService

router = APIRouter()

@router.post("/search", response_model=EvidenceList)
async def search_evidence(
    search_request: EvidenceSearchRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """搜索证据"""
    try:
        service = EvidenceService(db)
        result = await service.search_evidence(search_request, background_tasks)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"搜索证据失败: {str(e)}")

@router.get("/{evidence_id}", response_model=EvidenceResponse)
async def get_evidence(
    evidence_id: str,
    db: Session = Depends(get_db)
):
    """获取证据详情"""
    try:
        service = EvidenceService(db)
        result = await service.get_evidence(evidence_id)
        if not result:
            raise HTTPException(status_code=404, detail="证据不存在")
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取证据失败: {str(e)}")

@router.put("/{evidence_id}", response_model=EvidenceResponse)
async def update_evidence(
    evidence_id: str,
    evidence_update: EvidenceUpdate,
    db: Session = Depends(get_db)
):
    """更新证据信息"""
    try:
        service = EvidenceService(db)
        result = await service.update_evidence(evidence_id, evidence_update)
        if not result:
            raise HTTPException(status_code=404, detail="证据不存在")
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"更新证据失败: {str(e)}")

@router.get("/", response_model=EvidenceList)
async def list_evidence(
    page: int = Query(1, ge=1, description="页码"),
    size: int = Query(20, ge=1, le=100, description="每页数量"),
    plan_id: Optional[str] = Query(None, description="关联企划ID"),
    status: Optional[str] = Query(None, description="状态过滤"),
    db: Session = Depends(get_db)
):
    """获取证据列表"""
    try:
        service = EvidenceService(db)
        result = await service.list_evidence(
            page=page, 
            size=size, 
            plan_id=plan_id, 
            status=status
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取证据列表失败: {str(e)}")

@router.delete("/{evidence_id}")
async def delete_evidence(
    evidence_id: str,
    db: Session = Depends(get_db)
):
    """删除证据"""
    try:
        service = EvidenceService(db)
        success = await service.delete_evidence(evidence_id)
        if not success:
            raise HTTPException(status_code=404, detail="证据不存在")
        return {"message": "证据删除成功"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"删除证据失败: {str(e)}")

@router.post("/{evidence_id}/download")
async def download_evidence_file(
    evidence_id: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """下载证据文件"""
    try:
        service = EvidenceService(db)
        await service.download_evidence_file(evidence_id, background_tasks)
        return {"message": "文件下载任务已启动"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"下载证据文件失败: {str(e)}")

@router.get("/{evidence_id}/content")
async def get_evidence_content(
    evidence_id: str,
    db: Session = Depends(get_db)
):
    """获取证据文件内容"""
    try:
        service = EvidenceService(db)
        content = await service.get_evidence_content(evidence_id)
        if not content:
            raise HTTPException(status_code=404, detail="证据内容不存在")
        return content
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取证据内容失败: {str(e)}")

@router.post("/{evidence_id}/evaluate")
async def evaluate_evidence_quality(
    evidence_id: str,
    db: Session = Depends(get_db)
):
    """评估证据质量"""
    try:
        service = EvidenceService(db)
        evaluation = await service.evaluate_evidence_quality(evidence_id)
        return evaluation
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"评估证据质量失败: {str(e)}")
