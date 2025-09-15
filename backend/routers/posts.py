from fastapi import APIRouter, Depends

import schemas
import crud
from dependencies import get_current_active_user
from database import SessionDep

router = APIRouter()


@router.get("/", response_model=list[schemas.Post])
async def read_posts(
    skip: int = 0,
    limit: int = 10,
    session: SessionDep = None,
):
    """Get all posts"""
    posts = crud.get_posts(skip=skip, limit=limit, session=session)
    return posts


@router.get("/{post_id}", response_model=schemas.Post)
async def read_post(
    post_id: int,
    session: SessionDep = None,
):
    """Get post by id"""
    return crud.get_post(post_id=post_id, session=session)


@router.post(
    "/", response_model=schemas.Post, dependencies=[Depends(get_current_active_user)]
)
async def create_post(
    post: schemas.PostCreate,
    session: SessionDep = None,
):
    """Create post"""
    return crud.create_post(post=post, session=session)


@router.delete("/{post_id}", dependencies=[Depends(get_current_active_user)])
async def delete_post(
    post_id: int,
    session: SessionDep = None,
):
    """Delete post"""
    return crud.delete_post(post_id=post_id, session=session)


@router.patch(
    "/{post_id}",
    response_model=schemas.Post,
    dependencies=[Depends(get_current_active_user)],
)
async def update_post(
    post_id: int,
    post: schemas.PostCreate,
    session: SessionDep = None,
):
    """Update post"""
    return crud.update_post(post_id=post_id, post=post, session=session)
