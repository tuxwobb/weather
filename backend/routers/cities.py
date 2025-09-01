from typing import Annotated

from fastapi import APIRouter, Depends

from .. import schemas
from .. import crud
from ..database import get_db
from sqlalchemy.orm import Session

router = APIRouter()


async def common_parameters(name: str | None = None, skip: int = 0, limit: int = 100):
    return {"name": name, "skip": skip, "limit": limit}


@router.get("/", response_model=list[schemas.City])
async def read_cities(
    commons: Annotated[dict, Depends(common_parameters)], db: Session = Depends(get_db)
):
    """Get all cities"""
    cities = crud.get_cities(db, commons)
    return cities


@router.get("/{city_id}", response_model=schemas.City)
async def read_city(city_id: int, db: Session = Depends(get_db)):
    """Get city by id"""
    return crud.get_city(db, city_id=city_id)


@router.post("/", response_model=schemas.City)
async def create_city(city: schemas.CityCreate, db: Session = Depends(get_db)):
    """Create city"""
    return crud.create_city(db=db, city=city)


@router.delete("/{city_id}")
async def delete_city(city_id: int, db: Session = Depends(get_db)):
    """Delete city"""
    return crud.delete_city(db=db, city_id=city_id)


@router.patch("/{city_id}", response_model=schemas.City)
async def update_city(
    city_id: int, city: schemas.CityCreate, db: Session = Depends(get_db)
):
    """Update city"""
    return crud.update_city(db=db, city_id=city_id, city=city)
