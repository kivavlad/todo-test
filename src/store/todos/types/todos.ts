export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

export enum FilterTodos {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}