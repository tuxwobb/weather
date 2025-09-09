from typing import Annotated
from fastapi import APIRouter, Depends

import schemas
import crud
from dependencies import get_current_active_user

router = APIRouter()


async def common_parameters(name: str | None = None, skip: int = 0, limit: int = 100):
    return {"name": name, "skip": skip, "limit": limit}


@router.get("/", response_model=list[schemas.City])
async def read_cities(commons: Annotated[dict, Depends(common_parameters)]):
    """Get all cities"""
    cities = crud.get_cities(commons)
    return cities


@router.get("/{city_id}", response_model=schemas.City)
async def read_city(city_id: int):
    """Get city by id"""
    return crud.get_city(city_id=city_id)


@router.post(
    "/", response_model=schemas.City, dependencies=[Depends(get_current_active_user)]
)
async def create_city(city: schemas.CityCreate):
    """Create city"""
    return crud.create_city(city=city)


@router.delete("/{city_id}", dependencies=[Depends(get_current_active_user)])
async def delete_city(city_id: int):
    """Delete city"""
    return crud.delete_city(city_id=city_id)


@router.patch(
    "/{city_id}",
    response_model=schemas.City,
    dependencies=[Depends(get_current_active_user)],
)
async def update_city(city_id: int, city: schemas.CityCreate):
    """Update city"""
    return crud.update_city(city_id=city_id, city=city)
