import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { TodoItem } from './types/todo';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, CdkDropList, CdkDrag],
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

  drop(event: CdkDragDrop<TodoItem[]>): void {
    moveItemInArray(
      this.todoService.todos(), 
      event.previousIndex, 
      event.currentIndex
    );

    this.todoService.reorder(this.todoService.todos());
  }
}