from fastapi import APIRouter
from app.api.api_v1.endpoints import auth, users, projects, contact, bitcoin, blog

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])
api_router.include_router(bitcoin.router, prefix="/bitcoin", tags=["bitcoin"])
api_router.include_router(blog.router, prefix="/blog", tags=["blog"]) 