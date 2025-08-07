from datetime import datetime
import uuid
import os
import json
import shutil
from fastapi import APIRouter, HTTPException, Depends, Form, File, UploadFile
from pydantic import BaseModel
from typing import List
from .auth import get_current_employee

router = APIRouter()

# Pydantic models
class BlogSectionResponse(BaseModel):
    id: str
    title: str
    content: str
    imageUrl: str
    createdAt: str

# File path for persistent storage
BLOG_DATA_FILE = "blog_sections.json"
BLOG_BACKUP_FILE = "blog_sections_backup.json"

def load_blog_sections() -> List[BlogSectionResponse]:
    """Load blog sections from JSON file with backup fallback"""
    try:
        if os.path.exists(BLOG_DATA_FILE):
            with open(BLOG_DATA_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return [BlogSectionResponse(**section) for section in data]
        elif os.path.exists(BLOG_BACKUP_FILE):
            # Try backup file if main file doesn't exist
            with open(BLOG_BACKUP_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return [BlogSectionResponse(**section) for section in data]
        return []
    except Exception as e:
        print(f"Error loading blog sections: {e}")
        return []

def save_blog_sections(sections: List[BlogSectionResponse]):
    """Save blog sections to JSON file with backup"""
    try:
        # Create backup of existing file if it exists
        if os.path.exists(BLOG_DATA_FILE):
            shutil.copy2(BLOG_DATA_FILE, BLOG_BACKUP_FILE)
        
        # Save new data
        with open(BLOG_DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump([section.dict() for section in sections], f, indent=2, ensure_ascii=False)
            
        print(f"Successfully saved {len(sections)} blog sections")
    except Exception as e:
        print(f"Error saving blog sections: {e}")
        raise HTTPException(status_code=500, detail="Failed to save blog section")

@router.get("/sections", response_model=List[BlogSectionResponse])
async def get_blog_sections():
    """Get all blog sections"""
    sections = load_blog_sections()
    return sections

@router.post("/sections", response_model=BlogSectionResponse)
async def create_blog_section(
    title: str = Form(...),
    content: str = Form(...),
    image: UploadFile = File(...),
    current_employee: str = Depends(get_current_employee)
):
    """Create a new blog section (admin only)"""
    
    # Validate file type
    if not image.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Create uploads directory if it doesn't exist
    upload_dir = "static/uploads"
    os.makedirs(upload_dir, exist_ok=True)
    
    # Save the uploaded file
    file_extension = os.path.splitext(image.filename)[1]
    filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(upload_dir, filename)
    
    try:
        with open(file_path, "wb") as buffer:
            content_data = await image.read()
            buffer.write(content_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save image: {str(e)}")
    
    # Create the image URL
    image_url = f"/static/uploads/{filename}"
    
    new_section = BlogSectionResponse(
        id=str(uuid.uuid4()),
        title=title,
        content=content,
        imageUrl=image_url,
        createdAt=datetime.utcnow().isoformat()
    )
    
    # Load existing sections and add new one
    sections = load_blog_sections()
    sections.append(new_section)
    save_blog_sections(sections)
    
    return new_section

@router.delete("/sections/{section_id}")
async def delete_blog_section(
    section_id: str,
    current_employee: str = Depends(get_current_employee)
):
    """Delete a blog section (admin only)"""
    
    sections = load_blog_sections()
    
    # Find and remove the section
    section_to_delete = None
    for section in sections:
        if section.id == section_id:
            section_to_delete = section
            break
    
    if not section_to_delete:
        raise HTTPException(status_code=404, detail="Blog section not found")
    
    # Remove the section
    sections = [s for s in sections if s.id != section_id]
    save_blog_sections(sections)
    
    # Try to delete the associated image file
    try:
        image_path = section_to_delete.imageUrl.replace('/static/', 'static/')
        if os.path.exists(image_path):
            os.remove(image_path)
            print(f"Deleted image file: {image_path}")
    except Exception as e:
        print(f"Error deleting image file: {e}")
    
    return {"message": "Blog section deleted successfully"}

@router.get("/health")
async def blog_health_check():
    """Health check for blog system"""
    try:
        sections = load_blog_sections()
        main_file_exists = os.path.exists(BLOG_DATA_FILE)
        backup_file_exists = os.path.exists(BLOG_BACKUP_FILE)
        
        return {
            "status": "healthy",
            "sections_count": len(sections),
            "storage": {
                "main_file_exists": main_file_exists,
                "backup_file_exists": backup_file_exists,
                "main_file_size": os.path.getsize(BLOG_DATA_FILE) if main_file_exists else 0,
                "backup_file_size": os.path.getsize(BLOG_BACKUP_FILE) if backup_file_exists else 0
            },
            "uploads_directory": {
                "exists": os.path.exists("static/uploads"),
                "writable": os.access("static/uploads", os.W_OK) if os.path.exists("static/uploads") else False
            }
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }
