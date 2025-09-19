import os
from datetime import datetime

from fastapi import APIRouter, UploadFile, Depends
from fastapi.responses import FileResponse

from dependencies import get_current_active_user, get_current_admin_user

router = APIRouter()


@router.get("/", dependencies=[Depends(get_current_active_user)])
async def get_files():
    """Get files"""
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


@router.post("/file", dependencies=[Depends(get_current_admin_user)])
async def create_upload_file(file: UploadFile):
    """Save file"""
    save_upload_file(file, "./files")
    return {"filename": file.filename, "size": file.size}


@router.post("/files", dependencies=[Depends(get_current_admin_user)])
async def create_upload_files(files: list[UploadFile]):
    """Save multiple files"""
    for file in files:
        save_upload_file(file, "./files")
    return {
        "filenames": [file.filename for file in files],
        "sizes": [file.size for file in files],
    }


@router.delete(
    "/{file_name}",
    dependencies=[Depends(get_current_admin_user)],
)
async def delete_file(
    file_name: str,
):
    """Delete file"""
    try:
        os.remove(f"./files/{file_name}")
        return {"message": "File deleted"}
    except FileNotFoundError:
        return {"message": "File not found"}


@router.get(
    "/{file_name}",
    dependencies=[Depends(get_current_admin_user)],
)
async def download(
    file_name: str,
):
    response = FileResponse(
        "./files/" + file_name,
        filename=file_name,
    )
    return response


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
