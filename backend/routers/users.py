from fastapi import APIRouter, Depends

import schemas
import crud
from dependencies import get_current_admin_user

router = APIRouter()


@router.get(
    "/",
    response_model=list[schemas.User],
    dependencies=[Depends(get_current_admin_user)],
)
async def read_users(skip: int = 0, limit: int = 10):
    """Get all users"""
    return crud.get_users(skip=skip, limit=limit)


@router.get(
    "/{user_id}",
    response_model=schemas.User,
    dependencies=[Depends(get_current_admin_user)],
)
async def read_user(user_id: int):
    """Get user by id"""
    user = crud.get_user(user_id=user_id)
    return user


@router.post(
    "/",
    response_model=schemas.User,
    dependencies=[Depends(get_current_admin_user)],
)
async def create_user(user: schemas.UserCreate):
    """Create user"""
    return crud.create_user(user=user)


@router.delete(
    "/{user_id}",
    dependencies=[Depends(get_current_admin_user)],
)
async def delete_user(user_id: int):
    """Delete user"""
    return crud.delete_user(user_id=user_id)


@router.patch(
    "/{user_id}",
    response_model=schemas.User,
    dependencies=[Depends(get_current_admin_user)],
)
async def update_user(user_id: int, user: schemas.UserBase):
    """Update user"""
    return crud.update_user(user_id=user_id, user=user)


@router.patch(
    "/activate_user/{user_id}",
    response_model=schemas.User,
    dependencies=[Depends(get_current_admin_user)],
)
async def make_active(user_id: int):
    """Make user active"""
    return crud.make_active_user(user_id=user_id)


@router.patch(
    "/admin_user/{user_id}",
    response_model=schemas.User,
    dependencies=[Depends(get_current_admin_user)],
)
async def make_admin(user_id: int):
    """Make user admin"""
    return crud.make_admin_user(user_id=user_id)
