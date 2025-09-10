from sqlalchemy.orm import Session
from fastapi import HTTPException

import models, schemas
from passlib.context import CryptContext
from database import SessionLocal


# Cities
def get_cities(commons):
    search = "%{}%".format(commons["name"] if commons["name"] else "")
    db = SessionLocal()
    cities = (
        db.query(models.City)
        .filter(models.City.name.like(search))
        .offset(commons["skip"])
        .limit(commons["limit"])
        .all()
    )
    db.close()
    return cities


def get_city(city_id: int):
    db = SessionLocal()
    city = db.query(models.City).filter(models.City.id == city_id).first()
    db.close()
    if city is None:
        raise HTTPException(status_code=404, detail="City not found")
    return city


def create_city(city: schemas.CityCreate):
    db = SessionLocal()
    db_city = models.City(name=city.name)
    db.add(db_city)
    db.commit()
    db.refresh(db_city)
    db.close()
    return db_city


def update_city(city_id: int, city: schemas.CityCreate):
    db = SessionLocal()
    db_city = db.query(models.City).filter(models.City.id == city_id).first()
    if db_city is None:
        db.close()
        raise HTTPException(status_code=404, detail="City not found")
    db_city.name = city.name
    db.commit()
    db.refresh(db_city)
    db.close()
    return db_city


def delete_city(city_id: int):
    db = SessionLocal()
    db.query(models.City).filter(models.City.id == city_id).delete()
    db.commit()
    db.close()
    return {"message": "City deleted"}


# Posts
def get_posts(skip: int = 0, limit: int = 10):
    db = SessionLocal()
    posts = db.query(models.Post).offset(skip).limit(limit).all()
    db.close()
    return posts


def get_post(post_id: int):
    db = SessionLocal()
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if post is None:
        db.close()
        raise HTTPException(status_code=404, detail="Post not found")
    db.close()
    return post


def create_post(post: schemas.PostCreate):
    db = SessionLocal()
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
    db.close()
    return db_post


def update_post(post_id: int, post: schemas.PostCreate):
    db = SessionLocal()
    db_post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if db_post is None:
        db.close()
        raise HTTPException(status_code=404, detail="Post not found")
    db_post.title = post.title
    db_post.body = post.body
    db_post.imageUrl = post.imageUrl
    db_post.author = post.author
    db_post.published = post.published
    db.commit()
    db.refresh(db_post)
    db.close()
    return db_post


def delete_post(post_id: int):
    db = SessionLocal()
    db.query(models.Post).filter(models.Post.id == post_id).delete()
    db.commit()
    db.close()
    return {"message": "Post deleted"}


# Users
def get_users(skip: int = 0, limit: int = 10):
    db = SessionLocal()
    users = db.query(models.User).offset(skip).limit(limit).all()
    db.close()
    return users


def get_user(user_id: int):
    db = SessionLocal()
    user = db.query(models.User).filter(models.User.id == user_id).first()
    db.close()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def create_user(user: schemas.UserCreate):
    db = SessionLocal()
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        fullname=user.fullname,
        username=user.username,
        email=user.email,
        active=False,
        admin=False,
        password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    db.close()
    return db_user


def update_user(user_id: int, user: schemas.UserBase):
    db = SessionLocal()
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")
    db_user.fullname = user.fullname
    db_user.username = user.username
    db_user.email = user.email
    db.commit()
    db.refresh(db_user)
    db.close()
    return db_user


def delete_user(user_id: int):
    db = SessionLocal()
    db.query(models.User).filter(models.User.id == user_id).delete()
    db.commit()
    db.close()
    return {"message": "User deleted"}


def make_active_user(user_id: int):
    db = SessionLocal()
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")
    db_user.active = True
    db.commit()
    db.refresh(db_user)
    db.close()
    return db_user


def make_admin_user(user_id: int):
    db = SessionLocal()
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")
    db_user.admin = True
    db.commit()
    db.refresh(db_user)
    db.close()
    return db_user
