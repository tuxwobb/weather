from fastapi import APIRouter, UploadFile, Depends
from dependencies import get_current_active_user

router = APIRouter()


@router.post("/file/", dependencies=[Depends(get_current_active_user)])
async def create_upload_file(file: UploadFile):
    return {"filename": file.filename}


@router.post("/files/", dependencies=[Depends(get_current_active_user)])
async def create_upload_files(files: list[UploadFile]):
    return {"filenames": [file.filename for file in files]}
