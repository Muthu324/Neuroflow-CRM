from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models.project import Project, ProjectTask, ProjectMilestone
from app.schemas.schemas import (
    ProjectCreate, ProjectUpdate, ProjectTaskCreate, ProjectTaskUpdate,
    ProjectMilestoneCreate, ProjectMilestoneUpdate
)
from datetime import datetime
from typing import List, Optional


class ProjectService:
    """CRUD operations for Project model"""
    
    @staticmethod
    def create_project(db: Session, user_id: int, project_create: ProjectCreate) -> Project:
        """Create a new project"""
        new_project = Project(
            user_id=user_id,
            name=project_create.name,
            description=project_create.description,
            client_name=project_create.client_name,
            client_email=project_create.client_email,
            client_phone=project_create.client_phone,
            status=project_create.status or "planning",
            deadline=project_create.deadline,
            progress=project_create.progress or 0,
            priority=project_create.priority or "average",
            value=project_create.value or 0,
            payment_status=project_create.payment_status or "unpaid",
            amount_paid=project_create.amount_paid or 0,
            risk_level=project_create.risk_level or "low",
            ai_risk_analysis=project_create.ai_risk_analysis,
        )
        
        db.add(new_project)
        db.commit()
        db.refresh(new_project)
        
        return new_project
    
    @staticmethod
    def get_project_by_id(db: Session, user_id: int, project_id: int) -> Optional[Project]:
        """Get project by ID (user-specific)"""
        return db.query(Project).filter(
            Project.id == project_id,
            Project.user_id == user_id
        ).first()
    
    @staticmethod
    def get_all_projects(
        db: Session,
        user_id: int,
        skip: int = 0,
        limit: int = 100,
        status: Optional[str] = None,
    ) -> tuple[List[Project], int]:
        """Get all projects for user with optional filtering"""
        query = db.query(Project).filter(Project.user_id == user_id)
        
        if status:
            query = query.filter(Project.status == status)
        
        total = query.count()
        projects = query.order_by(desc(Project.created_at)).offset(skip).limit(limit).all()
        
        return projects, total
    
    @staticmethod
    def update_project(db: Session, user_id: int, project_id: int, project_update: ProjectUpdate) -> Optional[Project]:
        """Update project"""
        project = ProjectService.get_project_by_id(db, user_id, project_id)
        
        if not project:
            return None
        
        update_data = project_update.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(project, field, value)
        
        project.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(project)
        
        return project
    
    @staticmethod
    def delete_project(db: Session, user_id: int, project_id: int) -> bool:
        """Delete project"""
        project = ProjectService.get_project_by_id(db, user_id, project_id)
        
        if not project:
            return False
        
        db.delete(project)
        db.commit()
        
        return True
    
    @staticmethod
    def add_task(
        db: Session,
        user_id: int,
        project_id: int,
        task_create: ProjectTaskCreate
    ) -> Optional[ProjectTask]:
        """Add task to project"""
        project = ProjectService.get_project_by_id(db, user_id, project_id)
        
        if not project:
            return None
        
        new_task = ProjectTask(
            project_id=project_id,
            title=task_create.title,
            description=task_create.description,
            completed=task_create.completed,
            order_index=len(project.tasks),
        )
        
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        
        return new_task
    
    @staticmethod
    def update_task(
        db: Session,
        user_id: int,
        project_id: int,
        task_id: int,
        task_update: ProjectTaskUpdate
    ) -> Optional[ProjectTask]:
        """Update project task"""
        project = ProjectService.get_project_by_id(db, user_id, project_id)
        
        if not project:
            return None
        
        task = db.query(ProjectTask).filter(
            ProjectTask.id == task_id,
            ProjectTask.project_id == project_id
        ).first()
        
        if not task:
            return None
        
        update_data = task_update.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(task, field, value)
        
        if task_update.completed and not task.completed_at:
            task.completed_at = datetime.utcnow()
        
        db.commit()
        db.refresh(task)
        
        return task
    
    @staticmethod
    def delete_task(db: Session, user_id: int, project_id: int, task_id: int) -> bool:
        """Delete project task"""
        project = ProjectService.get_project_by_id(db, user_id, project_id)
        
        if not project:
            return False
        
        task = db.query(ProjectTask).filter(
            ProjectTask.id == task_id,
            ProjectTask.project_id == project_id
        ).first()
        
        if not task:
            return False
        
        db.delete(task)
        db.commit()
        
        return True
    
    @staticmethod
    def add_milestone(
        db: Session,
        user_id: int,
        project_id: int,
        milestone_create: ProjectMilestoneCreate
    ) -> Optional[ProjectMilestone]:
        """Add milestone to project"""
        project = ProjectService.get_project_by_id(db, user_id, project_id)
        
        if not project:
            return None
        
        new_milestone = ProjectMilestone(
            project_id=project_id,
            title=milestone_create.title,
            description=milestone_create.description,
            due_date=milestone_create.due_date,
            completed=milestone_create.completed,
            order_index=len(project.milestones),
        )
        
        db.add(new_milestone)
        db.commit()
        db.refresh(new_milestone)
        
        return new_milestone
