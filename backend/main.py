from fastapi import Depends, FastAPI, UploadFile
from sqlmodel import Session
from fastapi.middleware.cors import CORSMiddleware

from . import models, schemas, crud
from .database import engine, get_db

models.Base.metadata.create_all(bind=engine)

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


# Cities
@app.get("/cities", response_model=list[schemas.City])
def read_cities(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    cities = crud.get_cities(db, skip=skip, limit=limit)
    return cities


@app.get("/cities/{city_id}", response_model=schemas.City)
def read_city(city_id: int, db: Session = Depends(get_db)):
    return crud.get_city(db, city_id=city_id)


@app.post("/cities/", response_model=schemas.City)
def create_city(city: schemas.CityCreate, db: Session = Depends(get_db)):
    return crud.create_city(db=db, city=city)


@app.delete("/cities/{city_id}")
def delete_city(city_id: int, db: Session = Depends(get_db)):
    return crud.delete_city(db=db, city_id=city_id)


@app.patch("/cities/{city_id}", response_model=schemas.City)
def update_city(city_id: int, city: schemas.CityCreate, db: Session = Depends(get_db)):
    return crud.update_city(db=db, city_id=city_id, city=city)


# Posts
@app.get("/posts", response_model=list[schemas.Post])
def read_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    posts = crud.get_posts(db, skip=skip, limit=limit)
    return posts


@app.get("/posts/{post_id}", response_model=schemas.Post)
def read_post(post_id: int, db: Session = Depends(get_db)):
    return crud.get_post(db, post_id=post_id)


@app.post("/posts/", response_model=schemas.Post)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    return crud.create_post(db=db, post=post)


@app.delete("/posts/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db)):
    return crud.delete_post(db=db, post_id=post_id)


@app.patch("/posts/{post_id}", response_model=schemas.Post)
def update_post(post_id: int, post: schemas.PostCreate, db: Session = Depends(get_db)):
    return crud.update_post(db=db, post_id=post_id, post=post)


# Users
@app.get("/users", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_users(db, skip=skip, limit=limit)


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id=user_id)
    return user


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)


@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return crud.delete_user(db=db, user_id=user_id)


@app.patch("/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.update_user(db=db, user_id=user_id, user=user)


# # Files
@app.post("/uploadfile/")
def create_upload_file(file: UploadFile):
    return {"filename": file.filename}


@app.post("/uploadfiles/")
def create_upload_files(files: list[UploadFile]):
    return {"filenames": [file.filename for file in files]}
