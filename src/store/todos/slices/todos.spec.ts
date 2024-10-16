import { todoAction, todoReducer } from "./todos";
import { ITodo, FilterTodos } from "../types/todos";

interface IState {
  list: ITodo[];
  filter: FilterTodos;
}

describe('todos selectors', () => {
  const initialState: IState = {
    list: [],
    filter: FilterTodos.ALL,
  }

  // createTodo
  it('test createTodo', () => {
    const action = todoAction.createTodo('NewTodo');
    const state = todoReducer(initialState, action);
        
    expect(state.list[0]).toEqual({id: expect.any(Number), title: 'NewTodo', completed: false});
  })

  // toggleComplete
  it('test toggleComplete', () => {
    const newState: IState = {
      ...initialState,
      list: [{id: 1, title: 'Toggle todo', completed: false}]
    }
    const action = todoAction.toggleComplete(1);
    const state = todoReducer(newState, action);

    expect(state.list[0]).toEqual({id: 1, title: 'Toggle todo', completed: true});
  })

  // removeTodo
  it('test removeTodo', () => {
    const newState: IState = {
      ...initialState,
      list: [{id: 2, title: 'remove todo', completed: false}]
    }
    const action = todoAction.removeTodo(2);
    const state = todoReducer(newState, action);

    expect(state.list).toEqual([]);
  })

  // clearCompleted
  it('test clearCompleted', () => {
    const newState: IState = {
      ...initialState,
      list: [
        {id: 1, title: 'first todo', completed: true},
        {id: 2, title: 'secons todo', completed: true},
        {id: 3, title: 'third todo', completed: false},
      ]
    }
    const action = todoAction.clearCompleted();
    const state = todoReducer(newState, action);

    expect(state.list).toEqual([{id: 3, title: 'third todo', completed: false},]);
  })

  // setFilter
  it('test setFilter', () => {
    const newState: IState = {
      ...initialState,
      filter: FilterTodos.ALL
    }
    const action = todoAction.setFilter(FilterTodos.ACTIVE);
    const state = todoReducer(newState, action);

    expect(state.filter).toEqual(FilterTodos.ACTIVE);
  })
})