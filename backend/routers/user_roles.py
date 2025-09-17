from fastapi import APIRouter, Depends

import crud
from dependencies import get_current_admin_user
from database import SessionDep
from schemas import UserRole

router = APIRouter()


@router.post(
    "/{user_id}",
    dependencies=[Depends(get_current_admin_user)],
)
async def update_user_roles(
    user_id: int,
    roles_list: list[UserRole],
    session: SessionDep = None,
):
    """Update role"""
    return crud.update_user_roles(user_id=user_id, roles=roles_list, session=session)
