from contextlib import asynccontextmanager
from pathlib import Path
import sys

import uvicorn
import time
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from sqlmodel import select
from fastapi.middleware.cors import CORSMiddleware

if __package__ in (None, ""):
    project_root = Path(__file__).resolve().parent.parent
    if str(project_root) not in sys.path:
        sys.path.insert(0, str(project_root))

from backend.config import init_db, engine, async_session
from backend.settings import settings as app_settings
from backend.routes.auth import router as auth_router
from backend.models.api_logs import Api_Logs


@asynccontextmanager
async def lifespan(app: FastAPI):
    print(f"Starting up {app_settings.APP_NAME}...")
    await init_db()

    # Log all registered routes in the worker process
    print("\n✅ Registered routes:")
    for route in app.routes:
        if hasattr(route, "methods"):
            print(f"  {', '.join(route.methods):8s} {route.path}")
    print()

    yield

    print("Shutting down: closing database connections...")
    await engine.dispose()
    print("Cleanup complete. All resources released.")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()

    # Capture request body (truncated to 50 chars to match model constraint)
    request_body_str = ""
    if request.method in ["POST", "PUT", "PATCH"]:
        try:
            body_bytes = await request.body()
            if body_bytes:
                request_body_str = body_bytes.decode("utf-8")[:50]
            
            # Replace receive to allow later handlers to read body
            async def receive():
                return {"type": "http.request", "body": body_bytes}
            request._receive = receive
        except Exception:
            request_body_str = "Error"

    response = await call_next(request)
    
    process_time = time.time() - start_time
    
    # Log to DB
    async with async_session() as session:
        log_entry = Api_Logs(
            endpoint=str(request.url.path)[:50],
            status_code=response.status_code,
            time_taken=round(process_time, 4),
            request_body=request_body_str,
            response_body="N/A", # Truncated or ignored due to complexity/50 char limit
        )
        session.add(log_entry)
        await session.commit()
        
    return response


app.include_router(auth_router)


@app.get("/")
async def root():
    return {"message": f"server is running on port: {app_settings.PORT}"}


@app.get("/logs", response_class=HTMLResponse)
async def get_logs_dashboard():
    async with async_session() as session:
        statement = select(Api_Logs).order_by(Api_Logs.created_at.desc()).limit(100)
        results = await session.execute(statement)
        logs = results.scalars().all()

    # Premium CSS/HTML for the dashboard
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Logs Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
        <style>
            :root {{
                --primary: #6366f1;
                --bg: #f8fafc;
                --text: #1e293b;
                --border: #e2e8f0;
                --card-bg: #ffffff;
            }}
            body {{
                font-family: 'Inter', sans-serif;
                background-color: var(--bg);
                color: var(--text);
                margin: 0;
                padding: 40px 20px;
            }}
            .container {{
                max-width: 1200px;
                margin: 0 auto;
            }}
            .header {{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
            }}
            h1 {{
                font-weight: 600;
                font-size: 24px;
                margin: 0;
            }}
            .refresh-btn {{
                background: var(--primary);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: opacity 0.2s;
            }}
            .refresh-btn:hover {{ opacity: 0.9; }}
            .table-container {{
                background: var(--card-bg);
                border-radius: 12px;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                overflow: hidden;
                border: 1px solid var(--border);
            }}
            table {{
                width: 100%;
                border-collapse: collapse;
                text-align: left;
            }}
            th {{
                background: #f1f5f9;
                padding: 16px;
                font-weight: 600;
                font-size: 14px;
                color: #64748b;
                border-bottom: 1px solid var(--border);
            }}
            td {{
                padding: 16px;
                border-bottom: 1px solid var(--border);
                font-size: 14px;
            }}
            tr:last-child td {{ border-bottom: none; }}
            .status {{
                padding: 4px 8px;
                border-radius: 6px;
                font-weight: 600;
                font-size: 12px;
            }}
            .status-200 {{ background: #dcfce7; color: #166534; }}
            .status-error {{ background: #fee2e2; color: #991b1b; }}
            .code-text {{
                font-family: monospace;
                background: #f1f5f9;
                padding: 2px 4px;
                border-radius: 4px;
                font-size: 12px;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>API Logs Dashboard</h1>
                <button class="refresh-btn" onclick="location.reload()">Refresh</button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Endpoint</th>
                            <th>Status</th>
                            <th>Latency</th>
                            <th>Req Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {"".join([f'''
                        <tr>
                            <td>{log.created_at.strftime("%H:%M:%S") if log.created_at else "-"}</td>
                            <td><span class="code-text">{log.endpoint}</span></td>
                            <td><span class="status {'status-200' if log.status_code == 200 else 'status-error'}">{log.status_code}</span></td>
                            <td>{log.time_taken}s</td>
                            <td><span class="code-text">{log.request_body}</span></td>
                        </tr>
                        ''' for log in logs])}
                    </tbody>
                </table>
            </div>
        </div>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)


if __name__ == "__main__":
    uvicorn.run(app, host=app_settings.HOST, port=app_settings.PORT)

