import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input('todo') todoInput!: Todo;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  toggleTodo(id: string) {
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
  }
}
