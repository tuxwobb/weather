from fastapi import APIRouter, UploadFile

router = APIRouter()


@router.post("/file/")
async def create_upload_file(file: UploadFile):
    return {"filename": file.filename}


@router.post("/files/")
async def create_upload_files(files: list[UploadFile]):
    return {"filenames": [file.filename for file in files]}
