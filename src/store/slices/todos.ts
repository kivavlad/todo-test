import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {generateCode} from "../../utils/utils";
import {ITodo} from "../../types";

type IState = {
  list: ITodo[];
}

const initialState: IState = {
  list: [],
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
    }
  }
})

export const {createTodo, toggleComplete, removeTodo, clearCompleted} = todoSlice.actions;
export default todoSlice.reducer;