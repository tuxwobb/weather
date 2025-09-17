from fastapi import APIRouter, Depends

import schemas
import crud
from dependencies import get_current_admin_user
from database import SessionDep

router = APIRouter()


@router.get(
    "/",
    response_model=list[schemas.Role],
    dependencies=[Depends(get_current_admin_user)],
)
async def read_roles(
    skip: int = 0,
    limit: int = 100,
    session: SessionDep = None,
):
    """Get all roles"""
    return crud.get_roles(skip=skip, limit=limit, session=session)


@router.get(
    "/{role_id}",
    response_model=schemas.Role,
    dependencies=[Depends(get_current_admin_user)],
)
async def read_role(
    role_id: int,
    session: SessionDep = None,
):
    """Get role by id"""
    role = crud.get_role(role_id=role_id, session=session)
    return role


@router.post(
    "/",
    response_model=schemas.RoleCreate,
    dependencies=[Depends(get_current_admin_user)],
)
async def create_role(
    role: schemas.RoleCreate,
    session: SessionDep = None,
):
    """Create role"""
    return crud.create_role(role=role, session=session)


@router.delete(
    "/{role_id}",
    dependencies=[Depends(get_current_admin_user)],
)
async def delete_role(
    role_id: int,
    session: SessionDep = None,
):
    """Delete role"""
    return crud.delete_role(role_id=role_id, session=session)


@router.patch(
    "/{user_id}",
    response_model=schemas.RoleCreate,
    dependencies=[Depends(get_current_admin_user)],
)
async def update_role(
    user_id: int,
    role: schemas.RoleCreate,
    session: SessionDep = None,
):
    """Update role"""
    return crud.update_role(user_id=user_id, role=role, session=session)
