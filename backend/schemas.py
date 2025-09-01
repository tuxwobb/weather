from pydantic import BaseModel


class CityBase(BaseModel):
    name: str


class City(CityBase):
    id: int


class CityCreate(CityBase):
    pass


class PostBase(BaseModel):
    title: str
    body: str
    imageUrl: str
    author: str
    published: str


class Post(PostBase):
    id: int


class PostCreate(PostBase):
    pass


class UserBase(BaseModel):
    fullname: str
    username: str
    email: str
    active: bool
    admin: bool


class User(UserBase):
    id: int


class UserCreate(UserBase):
    password: str
