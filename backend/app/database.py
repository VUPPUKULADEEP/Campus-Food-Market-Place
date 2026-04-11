# here give the database connection and get_db function

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# url = 'sqlite:///./test.db'
url = "mysql+pymysql://kuladeep:password@localhost:3306/ecommerce"
engine = create_engine(url)

base = declarative_base()

session = sessionmaker(autoflush=False, autocommit=False, bind = engine)

def init_db():
    base.metadata.create_all(bind = engine)

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()



