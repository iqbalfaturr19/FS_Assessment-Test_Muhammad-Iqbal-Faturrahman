from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import TaskCreate, TaskUpdate, TaskResponse
from ..crud import create_task, get_tasks, update_task, delete_task

router = APIRouter()

@router.post("/tasks/", response_model=TaskResponse)
def create_new_task(task: TaskCreate, db: Session = Depends(get_db)):
    return create_task(db, task)

@router.get("/tasks/todo", response_model=list[TaskResponse])
def read_todo_tasks(db: Session = Depends(get_db)):
    return get_tasks(db, completed=False)

@router.get("/tasks/completed", response_model=list[TaskResponse])
def read_completed_tasks(db: Session = Depends(get_db)):
    return get_tasks(db, completed=True)

@router.put("/tasks/{task_id}", response_model=TaskResponse)
def update_existing_task(task_id: int, task_data: TaskUpdate, db: Session = Depends(get_db)):
    task = update_task(db, task_id, task_data)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/tasks/{task_id}")
def remove_task(task_id: int, db: Session = Depends(get_db)):
    task = delete_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}