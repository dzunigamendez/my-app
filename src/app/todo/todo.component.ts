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
  @Output('toggle') toggleEvent = new EventEmitter();
  @Output('delete') deleteEvent = new EventEmitter();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}
}
