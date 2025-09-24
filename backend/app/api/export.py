"""
导出功能相关API路由
"""

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.services.export_service import ExportService

router = APIRouter()

@router.post("/plan/{plan_id}/pdf")
async def export_plan_to_pdf(
    plan_id: str,
    background_tasks: BackgroundTasks,
    include_evidence: bool = True,
    db: Session = Depends(get_db)
):
    """导出企划为PDF格式"""
    try:
        service = ExportService(db)
        file_path = await service.export_plan_to_pdf(
            plan_id=plan_id, 
            include_evidence=include_evidence,
            background_tasks=background_tasks
        )
        return {"message": "PDF导出任务已启动", "file_path": file_path}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"导出PDF失败: {str(e)}")

@router.post("/plan/{plan_id}/docx")
async def export_plan_to_docx(
    plan_id: str,
    background_tasks: BackgroundTasks,
    include_evidence: bool = True,
    db: Session = Depends(get_db)
):
    """导出企划为DOCX格式"""
    try:
        service = ExportService(db)
        file_path = await service.export_plan_to_docx(
            plan_id=plan_id,
            include_evidence=include_evidence,
            background_tasks=background_tasks
        )
        return {"message": "DOCX导出任务已启动", "file_path": file_path}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"导出DOCX失败: {str(e)}")

@router.post("/plan/{plan_id}/markdown")
async def export_plan_to_markdown(
    plan_id: str,
    background_tasks: BackgroundTasks,
    include_evidence: bool = True,
    db: Session = Depends(get_db)
):
    """导出企划为Markdown格式"""
    try:
        service = ExportService(db)
        file_path = await service.export_plan_to_markdown(
            plan_id=plan_id,
            include_evidence=include_evidence,
            background_tasks=background_tasks
        )
        return {"message": "Markdown导出任务已启动", "file_path": file_path}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"导出Markdown失败: {str(e)}")

@router.post("/plan/{plan_id}/package")
async def export_plan_package(
    plan_id: str,
    background_tasks: BackgroundTasks,
    format_type: str = "zip",
    db: Session = Depends(get_db)
):
    """导出企划完整包（文档+证据）"""
    try:
        service = ExportService(db)
        package_path = await service.export_plan_package(
            plan_id=plan_id,
            format_type=format_type,
            background_tasks=background_tasks
        )
        return {"message": "企划包导出任务已启动", "package_path": package_path}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"导出企划包失败: {str(e)}")

@router.get("/plan/{plan_id}/outline")
async def get_plan_outline(
    plan_id: str,
    format_type: str = "json",
    db: Session = Depends(get_db)
):
    """获取企划大纲（可视化用）"""
    try:
        service = ExportService(db)
        outline = await service.get_plan_outline(plan_id, format_type)
        return outline
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取企划大纲失败: {str(e)}")

@router.get("/download/{file_id}")
async def download_exported_file(
    file_id: str,
    db: Session = Depends(get_db)
):
    """下载导出的文件"""
    try:
        service = ExportService(db)
        file_path = await service.get_exported_file_path(file_id)
        if not file_path:
            raise HTTPException(status_code=404, detail="文件不存在")
        
        return FileResponse(
            path=file_path,
            filename=file_path.split("/")[-1],
            media_type='application/octet-stream'
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"下载文件失败: {str(e)}")

@router.get("/export/{export_id}/status")
async def get_export_status(
    export_id: str,
    db: Session = Depends(get_db)
):
    """获取导出任务状态"""
    try:
        service = ExportService(db)
        status = await service.get_export_status(export_id)
        return status
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取导出状态失败: {str(e)}")
