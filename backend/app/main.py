from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def sample():
    return {'message' : 'hello world'}