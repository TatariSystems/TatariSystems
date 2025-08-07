# Blog System Documentation

## Overview
The blog system provides a simple, persistent storage solution for managing blog posts with image uploads. It's designed to work on both local development and production environments.

## Features

### ✅ Persistent Storage
- Blog posts are stored in `blog_sections.json` file
- Automatic backup system with `blog_sections_backup.json`
- Data survives server restarts
- UTF-8 encoding support for international content

### ✅ Image Management
- Automatic image upload handling
- Unique filename generation using UUID
- Images stored in `static/uploads/` directory
- Automatic cleanup when posts are deleted

### ✅ Admin Authentication
- JWT-based authentication required for admin actions
- Only authorized employees can create/delete posts
- Public read access for all users

### ✅ Error Handling
- File type validation for images
- Backup/restore functionality
- Graceful error handling with detailed messages

## API Endpoints

### GET `/api/v1/blog/sections`
- **Purpose**: Retrieve all blog sections
- **Authentication**: None required
- **Response**: Array of blog section objects

### POST `/api/v1/blog/sections`
- **Purpose**: Create a new blog section
- **Authentication**: Required (admin only)
- **Body**: Form data with `title`, `content`, and `image` file
- **Response**: Created blog section object

### DELETE `/api/v1/blog/sections/{section_id}`
- **Purpose**: Delete a blog section
- **Authentication**: Required (admin only)
- **Response**: Success message

### GET `/api/v1/blog/health`
- **Purpose**: Health check for blog system
- **Authentication**: None required
- **Response**: System status and storage information

## Data Structure

```json
{
  "id": "uuid-string",
  "title": "Blog Post Title",
  "content": "Blog post content...",
  "imageUrl": "/static/uploads/filename.jpg",
  "createdAt": "2024-01-01T12:00:00.000000"
}
```

## File Storage

### Blog Data
- **Main File**: `blog_sections.json`
- **Backup File**: `blog_sections_backup.json`
- **Location**: Backend root directory

### Images
- **Directory**: `static/uploads/`
- **Naming**: UUID-based unique filenames
- **Access**: Served via FastAPI static files

## Production Considerations

### ✅ Current Implementation
- Persistent storage across server restarts
- Automatic backup system
- Image file management
- Admin authentication

### 🔄 Future Improvements
- Database integration (PostgreSQL, MongoDB)
- Cloud image storage (AWS S3, Cloudinary)
- Content validation and sanitization
- Rate limiting for uploads
- Image optimization and resizing

## Health Monitoring

The health endpoint provides:
- Number of blog sections
- Storage file status
- Upload directory permissions
- System error reporting

## Usage Examples

### Local Development
```bash
# Check system health
curl http://localhost:8000/api/v1/blog/health

# Get all blog sections
curl http://localhost:8000/api/v1/blog/sections
```

### Production
```bash
# Check system health
curl https://tatari-backend.onrender.com/api/v1/blog/health

# Get all blog sections
curl https://tatari-backend.onrender.com/api/v1/blog/sections
```

## Security Notes

- Admin authentication required for write operations
- File type validation for uploads
- Unique filename generation prevents conflicts
- Automatic cleanup of orphaned files
- Backup system prevents data loss
