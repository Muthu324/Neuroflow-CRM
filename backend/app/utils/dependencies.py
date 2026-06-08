from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.utils.auth import decode_token
from typing import Optional

# Security scheme
security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """
    Dependency to get current authenticated user from JWT token.
    
    Usage:
        @router.get("/endpoint")
        async def endpoint(current_user: User = Depends(get_current_user)):
            ...
    """
    token = credentials.credentials
    
    # Decode token
    token_data = decode_token(token)
    if not token_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verify token type is "access"
    if token_data.get("token_type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_id = token_data.get("user_id")
    
    # Get user from database
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive",
        )
    
    return user


async def get_optional_user(
    credentials: Optional[HTTPAuthCredentials] = Depends(security),
    db: Session = Depends(get_db)
) -> Optional[User]:
    """
    Optional authentication dependency.
    Returns user if valid token provided, otherwise returns None.
    """
    if not credentials:
        return None
    
    token = credentials.credentials
    token_data = decode_token(token)
    
    if not token_data:
        return None
    
    user_id = token_data.get("user_id")
    user = db.query(User).filter(User.id == user_id).first()
    
    return user if user and user.is_active else None
