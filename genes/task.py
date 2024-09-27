# genes/tasks.py
from celery import shared_task
from .utils import poblar_variantes

@shared_task
def tarea_poblar_variantes():
    poblar_variantes()
