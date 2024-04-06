from fastapi import FastAPI, UploadFile, File
from typing import List, Optional
import json
import os

app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

characters_data = {}

def save_uploaded_file(upload_file: UploadFile):
    """Save uploaded file and load character data."""
    with open(os.path.join(UPLOAD_DIR, upload_file.filename), "wb") as file_object:
        file_object.write(upload_file.file.read())

    with open(os.path.join(UPLOAD_DIR, upload_file.filename), "r") as file:
        uploaded_data = json.load(file)

    characters_data.update(uploaded_data)

@app.post("/upload/")
async def upload_file(character_file: UploadFile = File(...)):
    """Upload a JSON file with character information."""
    save_uploaded_file(character_file)
    return {"filename": character_file.filename, "message": "File uploaded successfully"}

@app.get("/characters/")
async def get_characters():
    """Get a list of all characters."""
    return characters_data

@app.get("/characters/{character_id}")
async def get_character(character_id: int):
    """Get information about a specific character."""
    return characters_data.get(str(character_id), {"error": "Character not found"})

@app.get("/search/")
async def search_characters(name: Optional[str] = None):
    """Search characters by name."""
    if name:
        result = [character for character in characters_data.values() if character.get("name") == name]
        if result:
            return result
        else:
            return {"error": "No character found with that name"}
    else:
        return {"error": "Please provide a name to search for"}
