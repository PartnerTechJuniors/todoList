import { Injectable, signal, computed } from '@angular/core';
import { TodoItem } from './types/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoList = signal<TodoItem[]>([]);

  public pendingTasks = computed(() =>
    this.todoList().filter(item => !item.completed)
  );

  public todos = this.todoList.asReadonly();

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('mytodos', JSON.stringify(this.todoList()));
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem('mytodos');
    if (data) {
      this.todoList.set(JSON.parse(data));
    }
  }

  addTask(task: string): void {
    if (task.trim()) {
      const newTask: TodoItem = {
        id: Date.now(),
        task: task.trim(),
        completed: false
      };
      this.todoList.update(todos => [...todos, newTask]);
      this.saveToLocalStorage();
    }
  }

  toggleCompletion(id: number): void {
    this.todoList.update(todos =>
      todos.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    this.saveToLocalStorage();
  }

  deleteTask(id: number): void {
    this.todoList.update(todos => todos.filter(item => item.id !== id));
    this.saveToLocalStorage();
  }
  
  reorder(newOrder: TodoItem[]): void {
    localStorage.removeItem('mytodos');
    this.todoList.set(newOrder);
    this.saveToLocalStorage();
  }
}