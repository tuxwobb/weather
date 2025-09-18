import os
from datetime import datetime

from pathlib import Path
from fastapi import APIRouter, UploadFile, File, Depends
from dependencies import get_current_active_user

router = APIRouter()


@router.get("/")
async def get_files():
    files = os.listdir("./files")
    return [
        {
            "name": file,
            "size": human_readable_size(os.stat(f"./files/{file}").st_size),
            "created_date": datetime.fromtimestamp(
                os.stat(f"./files/{file}").st_birthtime
            ),
        }
        for file in files
    ]


@router.post("/file", dependencies=[Depends(get_current_active_user)])
async def create_upload_file(file: UploadFile):
    save_upload_file(file, "./files")
    return {"filename": file.filename, "size": file.size}


@router.post("/files", dependencies=[Depends(get_current_active_user)])
async def create_upload_files(files: list[UploadFile]):
    for file in files:
        save_upload_file(file, "./files")
    return {
        "filenames": [file.filename for file in files],
        "sizes": [file.size for file in files],
    }


def save_upload_file(file: UploadFile, path: str) -> None:
    file_location = f"{path}/{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())


def human_readable_size(size, decimal_places=2):
    for unit in ["B", "KiB", "MiB", "GiB", "TiB", "PiB"]:
        if size < 1024.0 or unit == "PiB":
            break
        size /= 1024.0
    return f"{size:.{decimal_places}f} {unit}"
