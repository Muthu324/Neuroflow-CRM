from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import UserCreate, UserLogin, UserResponse, Token
from app.services.user_service import UserService
from app.utils.auth import create_tokens, decode_token
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()


@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def signup(
    user_create: UserCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new user account.
    
    - **email**: User email (must be unique)
    - **username**: Username (must be unique)
    - **password**: Password (minimum 8 characters)
    - **full_name**: User's full name (optional)
    """
    try:
        user = UserService.create_user(db, user_create)
        return user
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/login", response_model=Token)
def login(
    credentials: UserLogin,
    db: Session = Depends(get_db)
):
    """
    User login endpoint.
    
    Returns access and refresh tokens for authenticated user.
    """
    user = UserService.authenticate_user(db, credentials.email, credentials.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    tokens = create_tokens(user.id)
    
    return {
        "access_token": tokens["access_token"],
        "refresh_token": tokens["refresh_token"],
        "token_type": "bearer"
    }


@router.post("/refresh", response_model=Token)
def refresh_token(
    db: Session = Depends(get_db),
    credentials: HTTPBearer = Depends(security)
):
    """
    Refresh access token using refresh token.
    
    Provide refresh token in Authorization header to get new access token.
    """
    token = credentials.credentials
    token_data = decode_token(token)
    
    if not token_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token"
        )
    
    if token_data.get("token_type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type. Expected refresh token."
        )
    
    user_id = token_data.get("user_id")
    user = UserService.get_user_by_id(db, user_id)
    
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    # Generate new tokens
    new_tokens = create_tokens(user.id)
    
    return {
        "access_token": new_tokens["access_token"],
        "refresh_token": new_tokens["refresh_token"],
        "token_type": "bearer"
    }


@router.post("/verify-email", status_code=status.HTTP_200_OK)
def verify_email(
    db: Session = Depends(get_db),
    credentials: HTTPBearer = Depends(security)
):
    """Verify user email (placeholder for email verification flow)"""
    token = credentials.credentials
    token_data = decode_token(token)
    
    if not token_data:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    user_id = token_data.get("user_id")
    UserService.verify_email(db, user_id)
    
    return {"message": "Email verified successfully"}


@router.post("/logout", status_code=status.HTTP_200_OK)
def logout():
    """
    Logout endpoint.
    
    Note: With JWT tokens, logout is handled client-side by removing tokens.
    This endpoint serves as a placeholder for any server-side cleanup.
    """
    return {"message": "Logged out successfully"}
