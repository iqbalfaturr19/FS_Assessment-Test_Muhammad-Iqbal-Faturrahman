from sqlalchemy.orm import Session
from .models import Task
from .schemas import TaskCreate, TaskUpdate

def create_task(db: Session, task: TaskCreate):
    db_task = Task(title=task.title)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_tasks(db: Session, completed: bool):
    return db.query(Task).filter(Task.completed == completed).order_by(Task.created_at.asc() if not completed else Task.created_at.desc()).all()

def update_task(db: Session, task_id: int, task_data: TaskUpdate):
    task = db.query(Task).filter(Task.id == task_id).first()
    if task:
        task.title = task_data.title
        task.completed = task_data.completed
        db.commit()
        db.refresh(task)
    return task

def delete_task(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()
    if task:
        db.delete(task)
        db.commit()
    return task