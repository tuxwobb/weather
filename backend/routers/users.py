from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import schemas
from .. import crud
from ..database import get_db
from ..dependencies import get_current_admin_user

router = APIRouter()


@router.get(
    "/",
    response_model=list[schemas.User],
    dependencies=[Depends(get_current_admin_user)],
)
async def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """Get all users"""
    return crud.get_users(db, skip=skip, limit=limit)


@router.get(
    "/{user_id}",
    response_model=schemas.User,
    dependencies=[Depends(get_current_admin_user)],
)
async def read_user(user_id: int, db: Session = Depends(get_db)):
    """Get user by id"""
    user = crud.get_user(db, user_id=user_id)
    return user


@router.post(
    "/",
    response_model=schemas.User,
    dependencies=[Depends(get_current_admin_user)],
)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Create user"""
    return crud.create_user(db=db, user=user)


@router.delete(
    "/{user_id}",
    dependencies=[Depends(get_current_admin_user)],
)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Delete user"""
    return crud.delete_user(db=db, user_id=user_id)


@router.patch(
    "/{user_id}",
    response_model=schemas.User,
    dependencies=[Depends(get_current_admin_user)],
)
async def update_user(
    user_id: int, user: schemas.UserCreate, db: Session = Depends(get_db)
):
    """Update user"""
    return crud.update_user(db=db, user_id=user_id, user=user)


@router.patch(
    "/activate_user/{user_id}",
    response_model=schemas.User,
    dependencies=[Depends(get_current_admin_user)],
)
async def make_active(user_id: int, db: Session = Depends(get_db)):
    """Make user active"""
    return crud.make_active_user(db=db, user_id=user_id)


@router.patch(
    "/admin_user/{user_id}",
    response_model=schemas.User,
    dependencies=[Depends(get_current_admin_user)],
)
async def make_admin(user_id: int, db: Session = Depends(get_db)):
    """Make user admin"""
    return crud.make_admin_user(db=db, user_id=user_id)
