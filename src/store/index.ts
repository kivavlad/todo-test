import {configureStore} from "@reduxjs/toolkit";
import { todoReducer } from "./todos/slices/todos";

const store = configureStore({
  reducer: {
    todos: todoReducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;