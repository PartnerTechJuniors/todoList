import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  private todoService = inject(TodoService);
  newTask: string = '';
  title = signal('Todo list Partner');

  todos = this.todoService.todos;
  pendingTasks = this.todoService.pendingTasks;

  addTodo(): void {
    this.todoService.addTask(this.newTask);
    this.newTask = ''; 
  }

  toggle(id: number): void {
    this.todoService.toggleCompletion(id);
  }

  delete(id: number): void {
    this.todoService.deleteTask(id);
  }
}