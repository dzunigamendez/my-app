import { Component, OnInit } from '@angular/core';
import { FilterType } from '../filter-type';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

function generateId(): string {
  return Math.random().toString(16);
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [TodoService],
})
export class TodosComponent implements OnInit {
  title = 'Todos';
  task: string = '';
  filterType = FilterType;
  filteredBy: FilterType;
  filteredList: Todo[];

  constructor(private todoService: TodoService) {
    this.filteredBy = todoService.getFilteredBy();
    this.filteredList = todoService.getFilteredList();
  }

  ngOnInit(): void {}

  addTodo() {
    this.todoService.addTodo(this.task);
    this.filteredList = this.todoService.getFilteredList();
    this.task = '';
  }

  toggleTodo(id: string) {
    this.todoService.toggleTodo(id);
    this.filteredList = this.todoService.getFilteredList();
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
    this.filteredList = this.todoService.getFilteredList();
  }

  filterTodosBy(filterType: FilterType) {
    this.todoService.filterTodosBy(filterType);
    this.filteredBy = this.todoService.getFilteredBy();
    this.filteredList = this.todoService.getFilteredList();
  }
}
