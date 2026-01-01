from pydantic import BaseModel

# Request schema (input)
class BlogCreate(BaseModel):
    title: str
    content: str

# Response schema (output)
class BlogResponse(BlogCreate):
    id: int

    
