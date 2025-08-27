from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select
from fastapi.middleware.cors import CORSMiddleware


class CityBase(SQLModel):
    name: str = Field(index=True)


class City(CityBase, table=True):
    id: int = Field(primary_key=True, default=None)


class CityCreate(CityBase):
    pass


class PostBase(SQLModel):
    title: str = Field(index=True)
    body: str
    imageUrl: str
    author: str
    published: str


class Post(PostBase, table=True):
    id: int = Field(primary_key=True, default=None)


class PostCreate(PostBase):
    pass


sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


# Cities
@app.get("/cities")
def read_cities(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[City]:
    cities = session.exec(select(City).offset(offset).limit(limit)).all()
    return cities


@app.get("/cities/{city_id}")
def read_city(city_id: int, session: SessionDep) -> City:
    city = session.get(City, city_id)
    if not city:
        raise HTTPException(status_code=404, detail="City not found")
    return city


@app.post("/cities", response_model=City)
def create_city(city: CityCreate, session: SessionDep):
    db_city = City.model_validate(city)
    session.add(db_city)
    session.commit()
    session.refresh(db_city)
    return db_city


@app.delete("/cities/{city_id}")
def delete_city(city_id: int, session: SessionDep):
    city = session.get(City, city_id)
    if not city:
        raise HTTPException(status_code=404, detail="City not found")
    session.delete(city)
    session.commit()
    return {"ok": True}


@app.patch("/cities/{city_id}")
def update_city(city_id: int, city: City, session: SessionDep):
    city_db = session.get(City, city_id)
    if not city_db:
        raise HTTPException(status_code=404, detail="City not found")
    city_data = city.model_dump(exclude_unset=True)
    city_db.sqlmodel_update(city_data)
    session.add(city_db)
    session.commit()
    session.refresh(city_db)
    return city_db


# Posts
@app.get("/posts")
def read_posts(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Post]:
    posts = session.exec(select(Post).offset(offset).limit(limit)).all()
    return posts


@app.get("/posts/{post_id}")
def read_post(post_id: int, session: SessionDep) -> Post:
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@app.post("/posts", response_model=Post)
def create_post(post: PostCreate, session: SessionDep):
    db_post = Post.model_validate(post)
    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post


@app.delete("/posts/{post_id}")
def delete_post(post_id: int, session: SessionDep):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    session.delete(post)
    session.commit()
    return {"ok": True}


@app.patch("/posts/{post_id}")
def update_post(post_id: int, post: Post, session: SessionDep):
    post_db = session.get(Post, post_id)
    if not post_db:
        raise HTTPException(status_code=404, detail="Post not found")
    post_data = post.model_dump(exclude_unset=True)
    post_db.sqlmodel_update(post_data)
    session.add(post_db)
    session.commit()
    session.refresh(post_db)
    return post_db
