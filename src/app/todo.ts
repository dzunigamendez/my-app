export interface Todo extends NewTodo {
  id: string;
}

export interface NewTodo {
  isCompleted: boolean;
  task: string;
}

export interface ServerResponse {
  data: any;
}
export interface ServerTodosResponse {
  data: ServerTodo[];
}

export interface ServerTodo {
  id: string;
  attributes: {
    isCompleted: boolean;
    task: string;
  };
}
