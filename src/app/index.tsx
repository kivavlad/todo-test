import {useState, useCallback} from 'react';
import {useAppDispatch} from '../hooks/use-dispatch';
import {useAppSelector} from '../hooks/use-selector';
import {todoAction} from '../store/todos/slices/todos';
import {ITodo, FilterTodos} from '../store/todos/types/todos';

import Container from '../components/container';
import Form from '../components/form';
import Controls from '../components/controls'; 
import List from '../components/list';
import TodoItem from '../components/todo-item';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {list, filter} = useAppSelector(state => state.todos);
  const [value, setValue] = useState<string>('');
  const filteredTodos = filter === FilterTodos.ALL ? list : list.filter(todo => todo.completed === (filter === 'completed'));
  const total = filteredTodos.length;

  const callbacks = {
    // Создание нового todo
    onCreate: useCallback(() => dispatch(todoAction.createTodo(value)), [value]),
    // Переключатель выполнения
    onToggle: useCallback((id: number) => dispatch(todoAction.toggleComplete(id)), []),
    // Удаление todo
    onRemove: useCallback((id: number) => dispatch(todoAction.removeTodo(id)), []),
    // Очистить все выполненные todo
    onClear: useCallback(() => dispatch(todoAction.clearCompleted()), []),
    // Изменение фильтра
    onFilter: useCallback((param: FilterTodos) => dispatch(todoAction.setFilter(param)), [filter]),
  }

  const renders = {
    item: useCallback((item: ITodo) => (
      <TodoItem item={item} toggle={callbacks.onToggle} remove={callbacks.onRemove} />
    ), [callbacks.onToggle, callbacks.onRemove])
  }

  return (
    <Container>
      <Form value={value} setValue={setValue} onSubmit={callbacks.onCreate}/>
      <Controls total={total} filter={filter} setFilter={callbacks.onFilter} onClear={callbacks.onClear}/>
      <List list={filteredTodos} renderItem={renders.item}/>
    </Container>
  )
}

export default App;