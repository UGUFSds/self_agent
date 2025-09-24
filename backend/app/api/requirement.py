"""
需求澄清相关API路由
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.requirement import (
    RequirementSnapshotCreate,
    RequirementSnapshotUpdate,
    RequirementSnapshotResponse,
    RequirementSnapshotList
)
from app.services.requirement_service import RequirementService

router = APIRouter()

@router.post("/", response_model=RequirementSnapshotResponse)
async def create_requirement_snapshot(
    requirement: RequirementSnapshotCreate,
    db: Session = Depends(get_db)
):
    """创建需求快照"""
    try:
        service = RequirementService(db)
        result = await service.create_requirement_snapshot(requirement)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"创建需求快照失败: {str(e)}")

@router.get("/{requirement_id}", response_model=RequirementSnapshotResponse)
async def get_requirement_snapshot(
    requirement_id: str,
    db: Session = Depends(get_db)
):
    """获取需求快照详情"""
    try:
        service = RequirementService(db)
        result = await service.get_requirement_snapshot(requirement_id)
        if not result:
            raise HTTPException(status_code=404, detail="需求快照不存在")
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取需求快照失败: {str(e)}")

@router.put("/{requirement_id}", response_model=RequirementSnapshotResponse)
async def update_requirement_snapshot(
    requirement_id: str,
    requirement_update: RequirementSnapshotUpdate,
    db: Session = Depends(get_db)
):
    """更新需求快照"""
    try:
        service = RequirementService(db)
        result = await service.update_requirement_snapshot(requirement_id, requirement_update)
        if not result:
            raise HTTPException(status_code=404, detail="需求快照不存在")
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"更新需求快照失败: {str(e)}")

@router.get("/", response_model=RequirementSnapshotList)
async def list_requirement_snapshots(
    page: int = Query(1, ge=1, description="页码"),
    size: int = Query(20, ge=1, le=100, description="每页数量"),
    db: Session = Depends(get_db)
):
    """获取需求快照列表"""
    try:
        service = RequirementService(db)
        result = await service.list_requirement_snapshots(page=page, size=size)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取需求快照列表失败: {str(e)}")

@router.delete("/{requirement_id}")
async def delete_requirement_snapshot(
    requirement_id: str,
    db: Session = Depends(get_db)
):
    """删除需求快照"""
    try:
        service = RequirementService(db)
        success = await service.delete_requirement_snapshot(requirement_id)
        if not success:
            raise HTTPException(status_code=404, detail="需求快照不存在")
        return {"message": "需求快照删除成功"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"删除需求快照失败: {str(e)}")

@router.post("/{requirement_id}/validate")
async def validate_requirement_snapshot(
    requirement_id: str,
    db: Session = Depends(get_db)
):
    """验证需求快照完整性"""
    try:
        service = RequirementService(db)
        validation_result = await service.validate_requirement_snapshot(requirement_id)
        return validation_result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"验证需求快照失败: {str(e)}")
