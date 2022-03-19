import { FilterType } from './filter-type';
import { Todo } from './todo';

function generateId(): string {
  return Math.random().toString(16);
}

export class TodoService {
  private filteredBy: FilterType = FilterType.All;
  private list: Todo[] = [
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
  ];
  private filteredList: Todo[] = this.list;

  getList() {
    return this.list;
  }

  getFilteredList() {
    return this.filteredList;
  }

  getFilteredBy() {
    return this.filteredBy;
  }

  addTodo(task: string) {
    this.list.push({ id: generateId(), task, isCompleted: false });
    this.filterTodosBy(this.filteredBy);
  }

  toggleTodo(id: string) {
    this.list = this.list.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
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
    this.filteredBy = filterType;
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
