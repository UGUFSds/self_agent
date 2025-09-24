"""
基础服务类
"""

from sqlalchemy.orm import Session
from typing import Type, TypeVar, Generic, Optional, List, Any, Dict
from pydantic import BaseModel
from app.core.database import get_redis
import logging

logger = logging.getLogger(__name__)

ModelType = TypeVar("ModelType")
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

class BaseService(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    """基础服务类"""
    
    def __init__(self, model: Type[ModelType], db: Session):
        self.model = model
        self.db = db
        self.redis = get_redis()
    
    async def create(self, obj_in: CreateSchemaType) -> ModelType:
        """创建对象"""
        try:
            obj_data = obj_in.dict() if hasattr(obj_in, 'dict') else obj_in
            db_obj = self.model(**obj_data)
            self.db.add(db_obj)
            self.db.commit()
            self.db.refresh(db_obj)
            logger.info(f"Created {self.model.__name__} with id: {db_obj.id}")
            return db_obj
        except Exception as e:
            self.db.rollback()
            logger.error(f"Failed to create {self.model.__name__}: {e}")
            raise
    
    async def get(self, id: str) -> Optional[ModelType]:
        """获取单个对象"""
        try:
            return self.db.query(self.model).filter(self.model.id == id).first()
        except Exception as e:
            logger.error(f"Failed to get {self.model.__name__} with id {id}: {e}")
            raise
    
    async def update(self, id: str, obj_in: UpdateSchemaType) -> Optional[ModelType]:
        """更新对象"""
        try:
            db_obj = await self.get(id)
            if not db_obj:
                return None
            
            update_data = obj_in.dict(exclude_unset=True) if hasattr(obj_in, 'dict') else obj_in
            for field, value in update_data.items():
                setattr(db_obj, field, value)
            
            self.db.commit()
            self.db.refresh(db_obj)
            logger.info(f"Updated {self.model.__name__} with id: {id}")
            return db_obj
        except Exception as e:
            self.db.rollback()
            logger.error(f"Failed to update {self.model.__name__} with id {id}: {e}")
            raise
    
    async def delete(self, id: str) -> bool:
        """删除对象"""
        try:
            db_obj = await self.get(id)
            if not db_obj:
                return False
            
            self.db.delete(db_obj)
            self.db.commit()
            logger.info(f"Deleted {self.model.__name__} with id: {id}")
            return True
        except Exception as e:
            self.db.rollback()
            logger.error(f"Failed to delete {self.model.__name__} with id {id}: {e}")
            raise
    
    async def list(
        self, 
        page: int = 1, 
        size: int = 20, 
        filters: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """获取对象列表"""
        try:
            query = self.db.query(self.model)
            
            # 应用过滤条件
            if filters:
                for field, value in filters.items():
                    if hasattr(self.model, field) and value is not None:
                        query = query.filter(getattr(self.model, field) == value)
            
            # 计算总数
            total = query.count()
            
            # 分页
            offset = (page - 1) * size
            items = query.offset(offset).limit(size).all()
            
            return {
                "items": items,
                "total": total,
                "page": page,
                "size": size
            }
        except Exception as e:
            logger.error(f"Failed to list {self.model.__name__}: {e}")
            raise
