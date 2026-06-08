from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.utils.dependencies import get_current_user
from app.schemas.schemas import UserResponse, UserUpdate
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserResponse)
def get_current_user_profile(
    current_user: User = Depends(get_current_user)
):
    """Get current user profile"""
    return current_user


@router.put("/me", response_model=UserResponse)
def update_current_user(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update current user profile"""
    user = UserService.update_user(db, current_user, user_update)
    return user


@router.post("/me/change-password", status_code=status.HTTP_200_OK)
def change_password(
    current_password: str,
    new_password: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Change user password"""
    from app.utils.auth import verify_password
    
    # Verify current password
    if not verify_password(current_password, current_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Current password is incorrect"
        )
    
    # Change to new password
    UserService.change_password(db, current_user, new_password)
    
    return {"message": "Password changed successfully"}


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
def deactivate_account(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Deactivate user account"""
    UserService.deactivate_user(db, current_user.id)
