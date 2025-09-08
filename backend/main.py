from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Base
from database import engine
from routers import cities, posts, users, files, auth

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(cities.router, prefix="/cities", tags=["cities"])
app.include_router(posts.router, prefix="/posts", tags=["posts"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(files.router, prefix="/files", tags=["files"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])

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


@app.get("/")
async def root():
    return {"message": "Welcome on Bobkovo fun API!"}
