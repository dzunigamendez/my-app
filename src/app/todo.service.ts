import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { FilterType } from './filter-type';
import { Todo } from './todo';

function generateId(): string {
  return Math.random().toString(16);
}

export class TodoService {
  // rxjs /// Observable <- Subject <- BehaviorSubject
  private filteredBy$ = new BehaviorSubject<FilterType>(FilterType.All);
  private list$ = new BehaviorSubject<Todo[]>([
    {
      id: generateId(),
      task: 'JavaScript',
      isCompleted: true,
    },
    {
      id: generateId(),
      task: 'TypeScript',
      isCompleted: false,
    },
    {
      id: generateId(),
      task: 'Angular',
      isCompleted: false,
    },
  ]);

  getList(): Observable<Todo[]> {
    return this.list$.asObservable();
  }

  // Observable (filteredList) ---> combineLatest --> filteredBy$ + list$
  getFilteredList(): Observable<Todo[]> {
    return combineLatest([this.filteredBy$, this.list$]).pipe(
      map(([filteredBy, list]) => {
        switch (filteredBy) {
          case FilterType.Active:
            return list.filter((todo) => !todo.isCompleted);
          case FilterType.Completed:
            return list.filter((todo) => todo.isCompleted);
          default:
            return list;
        }
      })
    );
  }

  getFilteredBy(): Observable<FilterType> {
    return this.filteredBy$;
  }

  addTodo(task: string) {
    const newTodo: Todo = {
      id: generateId(),
      task,
      isCompleted: false,
    };
    const newList = [...this.list$.getValue(), newTodo];
    this.list$.next(newList);
  }

  toggleTodo(id: string) {
    const updatedList = this.list$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    this.list$.next(updatedList);
  }

  deleteTodo(id: string) {
    const nextList = this.list$.getValue().filter((todo) => todo.id !== id);
    this.list$.next(nextList);
  }

  filterTodosBy(filteredBy: FilterType) {
    this.filteredBy$.next(filteredBy);
  }
}
