import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {generateCode} from "../../../utils/utils";
import {ITodo, FilterTodos} from "../types/todos";

interface IState {
  list: ITodo[];
  filter: FilterTodos;
}

const initialState: IState = {
  list: [],
  filter: FilterTodos.ALL,
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Создание новой todo
    createTodo(state, actions: PayloadAction<string>) {
      state.list = [...state.list, {id: generateCode(), title: actions.payload, completed: false}];
    },

    // Переключатель выполнения todo по id
    toggleComplete(state, action: PayloadAction<number>) {
      const toggleTodo = state.list.find(todo => todo.id === action.payload);
      if (toggleTodo) {
        toggleTodo.completed = !toggleTodo?.completed;
      }
    },

    // Удаление todo по id 
    removeTodo(state, action: PayloadAction<number>) {
      state.list = state.list.filter(todo => todo.id !== action.payload);
    },

    // Удаление всех выполненных todo
    clearCompleted(state) {
      state.list = state.list.filter(todo => todo.completed !== true);
    },

    // Изменение фильтра
    setFilter(state, action: PayloadAction<FilterTodos>) {
      state.filter = action.payload;
    }
  }
})

export const { actions: todoAction } = todoSlice;
export const { reducer: todoReducer } = todoSlice;