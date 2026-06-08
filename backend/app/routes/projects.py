from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.utils.dependencies import get_current_user
from app.schemas.schemas import (
    ProjectCreate, ProjectUpdate, ProjectResponse, ProjectListResponse,
    ProjectTaskCreate, ProjectTaskUpdate, ProjectTaskResponse,
    ProjectMilestoneCreate, ProjectMilestoneUpdate, ProjectMilestoneResponse
)
from app.services.project_service import ProjectService
from typing import List

router = APIRouter(prefix="/projects", tags=["projects"])


@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(
    project_create: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new project"""
    project = ProjectService.create_project(db, current_user.id, project_create)
    return project


@router.get("/", response_model=dict)
def get_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    status: str = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all projects with pagination and filtering"""
    projects, total = ProjectService.get_all_projects(
        db, current_user.id, skip, limit, status
    )
    
    return {
        "items": [ProjectListResponse.from_orm(project) for project in projects],
        "total": total,
        "skip": skip,
        "limit": limit
    }


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get project by ID"""
    project = ProjectService.get_project_by_id(db, current_user.id, project_id)
    
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    
    return project


@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int,
    project_update: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update project"""
    project = ProjectService.update_project(db, current_user.id, project_id, project_update)
    
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    
    return project


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete project"""
    success = ProjectService.delete_project(db, current_user.id, project_id)
    
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")


# ============================================================================
# PROJECT TASKS
# ============================================================================

@router.post("/{project_id}/tasks", response_model=ProjectTaskResponse)
def add_task(
    project_id: int,
    task_create: ProjectTaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add task to project"""
    task = ProjectService.add_task(db, current_user.id, project_id, task_create)
    
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    
    return task


@router.put("/{project_id}/tasks/{task_id}", response_model=ProjectTaskResponse)
def update_task(
    project_id: int,
    task_id: int,
    task_update: ProjectTaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update project task"""
    task = ProjectService.update_task(db, current_user.id, project_id, task_id, task_update)
    
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    
    return task


@router.delete("/{project_id}/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    project_id: int,
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete project task"""
    success = ProjectService.delete_task(db, current_user.id, project_id, task_id)
    
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")


# ============================================================================
# PROJECT MILESTONES
# ============================================================================

@router.post("/{project_id}/milestones", response_model=ProjectMilestoneResponse)
def add_milestone(
    project_id: int,
    milestone_create: ProjectMilestoneCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add milestone to project"""
    milestone = ProjectService.add_milestone(db, current_user.id, project_id, milestone_create)
    
    if not milestone:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    
    return milestone
