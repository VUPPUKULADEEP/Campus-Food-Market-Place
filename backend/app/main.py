from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import Base, engine, get_db
from app import models, schemas

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Simple Blog API")

# -------------------------
# CREATE BLOG
# -------------------------
@app.post("/blogs", response_model=schemas.BlogResponse)
def create_blog(blog: schemas.BlogCreate, db: Session = Depends(get_db)):
    new_blog = models.Blog(
        title=blog.title,
        content=blog.content
    )
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog


# -------------------------
# GET ALL BLOGS
# -------------------------
@app.get("/blogs", response_model=list[schemas.BlogResponse])
def get_blogs(db: Session = Depends(get_db)):
    return db.query(models.Blog).all()


# -------------------------
# GET BLOG BY ID
# -------------------------
@app.get("/blogs/{blog_id}", response_model=schemas.BlogResponse)
def get_blog(blog_id: int, db: Session = Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog
