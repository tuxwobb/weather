from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


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


class RoleBase(BaseModel):
    id: int
    name: str


class UserBase(BaseModel):
    fullname: str
    username: str
    email: str


class User(UserBase):
    id: int
    active: bool
    admin: bool
    roles: list[RoleBase] = []


class UserCreate(UserBase):
    password: str
