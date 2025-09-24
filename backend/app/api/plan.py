"""
企划生成相关API路由
"""

from fastapi import APIRouter, Depends, HTTPException, Query, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.schemas.plan import (
    PlanCreate,
    PlanUpdate,
    PlanResponse,
    PlanList
)
from app.services.plan_service import PlanService

router = APIRouter()

@router.post("/", response_model=PlanResponse)
async def create_plan(
    plan: PlanCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """创建企划文档"""
    try:
        service = PlanService(db)
        result = await service.create_plan(plan, background_tasks)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"创建企划文档失败: {str(e)}")

@router.get("/{plan_id}", response_model=PlanResponse)
async def get_plan(
    plan_id: str,
    db: Session = Depends(get_db)
):
    """获取企划文档详情"""
    try:
        service = PlanService(db)
        result = await service.get_plan(plan_id)
        if not result:
            raise HTTPException(status_code=404, detail="企划文档不存在")
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取企划文档失败: {str(e)}")

@router.put("/{plan_id}", response_model=PlanResponse)
async def update_plan(
    plan_id: str,
    plan_update: PlanUpdate,
    db: Session = Depends(get_db)
):
    """更新企划文档"""
    try:
        service = PlanService(db)
        result = await service.update_plan(plan_id, plan_update)
        if not result:
            raise HTTPException(status_code=404, detail="企划文档不存在")
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"更新企划文档失败: {str(e)}")

@router.get("/", response_model=PlanList)
async def list_plans(
    page: int = Query(1, ge=1, description="页码"),
    size: int = Query(20, ge=1, le=100, description="每页数量"),
    status: Optional[str] = Query(None, description="状态过滤"),
    db: Session = Depends(get_db)
):
    """获取企划文档列表"""
    try:
        service = PlanService(db)
        result = await service.list_plans(page=page, size=size, status=status)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取企划文档列表失败: {str(e)}")

@router.delete("/{plan_id}")
async def delete_plan(
    plan_id: str,
    db: Session = Depends(get_db)
):
    """删除企划文档"""
    try:
        service = PlanService(db)
        success = await service.delete_plan(plan_id)
        if not success:
            raise HTTPException(status_code=404, detail="企划文档不存在")
        return {"message": "企划文档删除成功"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"删除企划文档失败: {str(e)}")

@router.post("/{plan_id}/generate")
async def generate_plan_content(
    plan_id: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """生成企划内容（异步）"""
    try:
        service = PlanService(db)
        await service.generate_plan_content(plan_id, background_tasks)
        return {"message": "企划内容生成任务已启动"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"生成企划内容失败: {str(e)}")

@router.get("/{plan_id}/status")
async def get_plan_generation_status(
    plan_id: str,
    db: Session = Depends(get_db)
):
    """获取企划生成状态"""
    try:
        service = PlanService(db)
        status = await service.get_plan_generation_status(plan_id)
        return {"plan_id": plan_id, "status": status}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取生成状态失败: {str(e)}")

@router.post("/{plan_id}/validate")
async def validate_plan_completeness(
    plan_id: str,
    db: Session = Depends(get_db)
):
    """验证企划完整性"""
    try:
        service = PlanService(db)
        validation_result = await service.validate_plan_completeness(plan_id)
        return validation_result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"验证企划完整性失败: {str(e)}")
