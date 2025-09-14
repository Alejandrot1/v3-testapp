from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/api/hello")
async def hello():
    return {"message": "Hello, World!"}

@app.get("/api/stats")
async def stats():
    return JSONResponse(content={"visits": 100, "users": 50})