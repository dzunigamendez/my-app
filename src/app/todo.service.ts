import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FilterType } from './filter-type';
import { NewTodo, ServerTodosResponse, Todo } from './todo';

@Injectable()
export class TodoService {
  // rxjs /// Observable <- Subject <- BehaviorSubject
  private url = 'https://nameless-scrubland-86239.herokuapp.com/api/todos';
  private filteredBy$ = new BehaviorSubject<FilterType>(FilterType.All);
  private list$ = new BehaviorSubject<Todo[]>([]);
  private suscription: Subscription;

  constructor(private httpClient: HttpClient) {
    this.suscription = this.filteredBy$.subscribe((filteredBy) =>
      this.refreshList(filteredBy)
    );
  }

  getFilteredList(): Observable<Todo[]> {
    return this.list$.asObservable();
  }

  getFilteredBy(): Observable<FilterType> {
    return this.filteredBy$.asObservable();
  }

  addTodo(task: string) {
    const newTodo: NewTodo = {
      task,
      isCompleted: false,
    };
    this.httpClient
      .post(this.url, {
        data: newTodo,
      })
      .subscribe(() => {
        this.refreshList(this.filteredBy$.getValue());
      });
  }

  toggleTodo(id: string) {
    const todo = this.list$.getValue().find((todo) => todo.id === id);
    if (todo) {
      const patch = { isCompleted: !todo.isCompleted };
      this.httpClient
        .put(`${this.url}/${id}`, {
          data: patch,
        })
        .subscribe(() => {
          this.refreshList(this.filteredBy$.getValue());
        });
    }
  }

  deleteTodo(id: string) {
    this.httpClient.delete(`${this.url}/${id}`).subscribe(() => {
      this.refreshList(this.filteredBy$.getValue());
    });
  }

  filterTodosBy(filteredBy: FilterType) {
    this.filteredBy$.next(filteredBy);
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  private refreshList(filteredBy: FilterType) {
    let getUrl = `${this.url}?sort=createdAt`;
    let filters;
    switch (filteredBy) {
      case FilterType.Active:
        filters = '[isCompleted][$eq]=false';
        break;
      case FilterType.Completed:
        filters = '[isCompleted][$eq]=true';
        break;
      default:
        filters = null;
        break;
    }
    getUrl = filters ? `${getUrl}&filters${filters}` : getUrl;
    this.httpClient.get<ServerTodosResponse>(getUrl).subscribe((res) => {
      const todos = res.data.map((serverTodo) => ({
        id: serverTodo.id,
        task: serverTodo.attributes.task,
        isCompleted: serverTodo.attributes.isCompleted,
      }));
      this.list$.next(todos);
    });
  }

  // private getHeaders(): { [header: string]: string } | undefined {
  //   const token = this.authService.getToken();
  //   if (!token) {
  //     return;
  //   }
  //   return {
  //     Authorization: `Bearer ${token}`,
  //   };
  // }
}
