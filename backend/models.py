from sqlalchemy import Column, Integer, String, Boolean
from database import Base


class City(Base):
    __tablename__ = "city"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)


class Post(Base):
    __tablename__ = "post"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    body = Column(String)
    imageUrl = Column(String)
    author = Column(String)
    published = Column(String)


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String, nullable=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)
    active = Column(Boolean)
    admin = Column(Boolean)
