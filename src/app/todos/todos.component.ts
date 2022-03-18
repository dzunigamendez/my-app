import { Component, OnInit } from '@angular/core';
import { FilterType } from '../filter-type';
import { Todo } from '../todo';

function generateId(): string {
  return Math.random().toString(16);
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  title = 'Todos';
  list: Todo[] = [];
  filterType = FilterType;
  filteredBy: FilterType = FilterType.All;
  filteredList: Todo[] = this.list;

  constructor() {}

  ngOnInit(): void {}

  addTodo(event: SubmitEvent) {
    event.preventDefault();
    const target = <HTMLFormElement>event.currentTarget;
    const data = new FormData(target);
    const task = data.get('task')?.toString();
    if (task) {
      this.list.push({ id: generateId(), task, isCompleted: false });
      this.filterTodosBy(this.filteredBy);
    }
  }

  toggleTodo(id: string, isCompleted: boolean) {
    this.list = this.list.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted,
        };
      }
      return todo;
    });
    this.filterTodosBy(this.filteredBy);
  }

  deleteTodo(id: string) {
    this.list = this.list.filter((todo) => todo.id !== id);
    this.filterTodosBy(this.filteredBy);
  }

  filterTodosBy(filterType: FilterType) {
    switch (filterType) {
      case FilterType.Active:
        this.filteredList = this.list.filter((todo) => !todo.isCompleted);
        break;
      case FilterType.Completed:
        this.filteredList = this.list.filter((todo) => todo.isCompleted);
        break;
      default:
        this.filteredList = this.list;
        break;
    }
  }
}
