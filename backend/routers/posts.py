from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import schemas
from .. import crud
from ..database import get_db
from ..dependencies import get_current_active_user

router = APIRouter()


@router.get("/", response_model=list[schemas.Post])
async def read_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """Get all posts"""
    posts = crud.get_posts(db, skip=skip, limit=limit)
    return posts


@router.get("/{post_id}", response_model=schemas.Post)
async def read_post(post_id: int, db: Session = Depends(get_db)):
    """Get post by id"""
    return crud.get_post(db, post_id=post_id)


@router.post(
    "/", response_model=schemas.Post, dependencies=[Depends(get_current_active_user)]
)
async def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    """Create post"""
    return crud.create_post(db=db, post=post)


@router.delete("/{post_id}", dependencies=[Depends(get_current_active_user)])
async def delete_post(post_id: int, db: Session = Depends(get_db)):
    """Delete post"""
    return crud.delete_post(db=db, post_id=post_id)


@router.patch(
    "/{post_id}",
    response_model=schemas.Post,
    dependencies=[Depends(get_current_active_user)],
)
async def update_post(
    post_id: int, post: schemas.PostCreate, db: Session = Depends(get_db)
):
    """Update post"""
    return crud.update_post(db=db, post_id=post_id, post=post)
