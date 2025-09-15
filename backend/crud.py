from sqlalchemy.orm import Session
from fastapi import HTTPException

import models, schemas
from passlib.context import CryptContext


# Cities
def get_cities(commons, session: Session = None):
    search = "%{}%".format(commons["name"] if commons["name"] else "")
    cities = (
        session.query(models.City)
        .filter(models.City.name.like(search))
        .offset(commons["skip"])
        .limit(commons["limit"])
        .all()
    )
    return cities


def get_city(city_id: int, session: Session = None):
    city = session.query(models.City).filter(models.City.id == city_id).first()
    if city is None:
        raise HTTPException(status_code=404, detail="City not found")
    return city


def create_city(city: schemas.CityCreate, session: Session = None):
    db_city = models.City(name=city.name)
    session.add(db_city)
    session.commit()
    session.refresh(db_city)
    return db_city


def update_city(city_id: int, city: schemas.CityCreate, session: Session = None):
    db_city = session.query(models.City).filter(models.City.id == city_id).first()
    if db_city is None:
        raise HTTPException(status_code=404, detail="City not found")
    db_city.name = city.name
    session.commit()
    session.refresh(db_city)
    return db_city


def delete_city(city_id: int, session: Session = None):
    session.query(models.City).filter(models.City.id == city_id).delete()
    session.commit()
    return {"message": "City deleted"}


# Posts
def get_posts(skip: int = 0, limit: int = 10, session: Session = None):
    posts = session.query(models.Post).offset(skip).limit(limit).all()
    return posts


def get_post(post_id: int, session: Session = None):
    post = session.query(models.Post).filter(models.Post.id == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


def create_post(post: schemas.PostCreate, session: Session = None):
    db_post = models.Post(
        title=post.title,
        body=post.body,
        imageUrl=post.imageUrl,
        author=post.author,
        published=post.published,
    )
    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post


def update_post(post_id: int, post: schemas.PostCreate, session: Session = None):
    db_post = session.query(models.Post).filter(models.Post.id == post_id).first()
    if db_post is None:
        session.close()
        raise HTTPException(status_code=404, detail="Post not found")
    db_post.title = post.title
    db_post.body = post.body
    db_post.imageUrl = post.imageUrl
    db_post.author = post.author
    db_post.published = post.published
    session.commit()
    session.refresh(db_post)
    return db_post


def delete_post(post_id: int, session: Session = None):
    session.query(models.Post).filter(models.Post.id == post_id).delete()
    session.commit()
    return {"message": "Post deleted"}


# Users
def get_users(skip: int = 0, limit: int = 10, session: Session = None):
    users = session.query(models.User).offset(skip).limit(limit).all()
    return users


def get_user(user_id: int, session: Session = None):
    user = session.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def create_user(user: schemas.UserCreate, session: Session = None):
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
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def update_user(user_id: int, user: schemas.UserBase, session: Session = None):
    db_user = session.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.fullname = user.fullname
    db_user.username = user.username
    db_user.email = user.email
    session.commit()
    session.refresh(db_user)
    return db_user


def delete_user(user_id: int, session: Session = None):
    session.query(models.User).filter(models.User.id == user_id).delete()
    session.commit()
    return {"message": "User deleted"}


def make_active_user(user_id: int, session: Session = None):
    db_user = session.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.active = True
    session.commit()
    session.refresh(db_user)
    return db_user


def make_admin_user(user_id: int, session: Session = None):
    db_user = session.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.admin = True
    session.commit()
    session.refresh(db_user)
    return db_user
