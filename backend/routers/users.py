from fastapi import APIRouter, Depends

import schemas
import crud
from dependencies import get_current_admin_user, get_current_user
from database import SessionDep

router = APIRouter()


@router.get(
    "/",
    response_model=list[schemas.User],
    dependencies=[Depends(get_current_admin_user)],
)
async def read_users(
    skip: int = 0,
    limit: int = 10,
    session: SessionDep = None,
):
    """Get all users"""
    return crud.get_users(skip=skip, limit=limit, session=session)


@router.get(
    "/{user_id}",
    response_model=schemas.User,
    dependencies=[Depends(get_current_admin_user)],
)
async def read_user(
    user_id: int,
    session: SessionDep = None,
):
    """Get user by id"""
    user = crud.get_user(user_id=user_id, session=session)
    return user


@router.post(
    "/",
    response_model=schemas.User,
    dependencies=[Depends(get_current_admin_user)],
)
async def create_user(
    user: schemas.UserCreate,
    session: SessionDep = None,
):
    """Create user"""
    return crud.create_user(user=user, session=session)


@router.delete(
    "/{user_id}",
    dependencies=[Depends(get_current_admin_user)],
)
async def delete_user(
    user_id: int,
    session: SessionDep = None,
):
    """Delete user"""
    return crud.delete_user(user_id=user_id, session=session)


@router.patch(
    "/{user_id}",
    response_model=schemas.User,
    dependencies=[Depends(get_current_admin_user)],
)
async def update_user(
    user_id: int,
    user: schemas.UserBase,
    session: SessionDep = None,
):
    """Update user"""
    return crud.update_user(user_id=user_id, user=user, session=session)


@router.patch(
    "/activate_user/{user_id}",
    response_model=schemas.User,
    dependencies=[Depends(get_current_admin_user)],
)
async def make_active(
    user_id: int,
    session: SessionDep = None,
):
    """Make user active"""
    return crud.make_active_user(user_id=user_id, session=session)


@router.patch(
    "/admin_user/{user_id}",
    response_model=schemas.User,
    dependencies=[Depends(get_current_admin_user)],
)
async def make_admin(
    user_id: int,
    session: SessionDep = None,
):
    """Make user admin"""
    return crud.make_admin_user(user_id=user_id, session=session)
