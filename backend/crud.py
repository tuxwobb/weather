from sqlalchemy.orm import Session
from fastapi import HTTPException

from . import models, schemas


# Cities
def get_cities(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.City).offset(skip).limit(limit).all()


def get_city(db: Session, city_id: int):
    city = db.query(models.City).filter(models.City.id == city_id).first()
    if city is None:
        raise HTTPException(status_code=404, detail="City not found")
    return city


def create_city(db: Session, city: schemas.CityCreate):
    db_city = models.City(name=city.name)
    db.add(db_city)
    db.commit()
    db.refresh(db_city)
    return db_city


def update_city(db: Session, city_id: int, city: schemas.CityCreate):
    db_city = db.query(models.City).filter(models.City.id == city_id).first()
    if db_city is None:
        raise HTTPException(status_code=404, detail="City not found")
    db_city.name = city.name
    db.commit()
    db.refresh(db_city)
    return db_city


def delete_city(db: Session, city_id: int):
    db.query(models.City).filter(models.City.id == city_id).delete()
    db.commit()
    return {"message": "City deleted"}


# Posts
def get_posts(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Post).offset(skip).limit(limit).all()


def get_post(db: Session, post_id: int):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


def create_post(db: Session, post: schemas.PostCreate):
    db_post = models.Post(
        title=post.title,
        body=post.body,
        imageUrl=post.imageUrl,
        author=post.author,
        published=post.published,
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def update_post(db: Session, post_id: int, post: schemas.PostCreate):
    db_post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    db_post.title = post.title
    db_post.body = post.body
    db_post.imageUrl = post.imageUrl
    db_post.author = post.author
    db_post.published = post.published
    db.commit()
    db.refresh(db_post)
    return db_post


def delete_post(db: Session, post_id: int):
    db.query(models.Post).filter(models.Post.id == post_id).delete()
    db.commit()
    return {"message": "Post deleted"}


# Users
def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.User).offset(skip).limit(limit).all()


def get_user(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        fullname=user.fullname,
        username=user.username,
        email=user.email,
        active=user.active,
        admin=user.admin,
        password=user.password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user_id: int, user: schemas.UserCreate):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.fullname = user.fullname
    db_user.username = user.username
    db_user.email = user.email
    db_user.active = user.active
    db_user.admin = user.admin
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int):
    db.query(models.User).filter(models.User.id == user_id).delete()
    db.commit()
    return {"message": "User deleted"}
