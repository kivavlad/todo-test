import {useState, useCallback} from 'react';
import {useAppDispatch} from '../hooks/use-dispatch';
import {useAppSelector} from '../hooks/use-selector';
import {createTodo, toggleComplete, removeTodo, clearCompleted} from '../store/slices/todos';
import Container from '../components/container';
import Form from '../components/form';
import Controls from '../components/controls'; 
import List from '../components/list';
import TodoItem from '../components/todo-item';
import {ITodo} from '../types';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {list} = useAppSelector(state => state.todos);
  const [value, setValue] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const filteredTodos = filter === 'all' ? list : list.filter(todo => todo.completed === (filter === 'completed'));
  const total = filteredTodos.length;

  const callbacks = {
    // Создание нового todo
    onCreate: useCallback(() => dispatch(createTodo(value)), [value]),
    // Переключатель выполнения
    onToggle: useCallback((id: number) => dispatch(toggleComplete(id)), []),
    // Удаление todo
    onRemove: useCallback((id: number) => dispatch(removeTodo(id)), []),
    // Очистить все выполненные todo
    onClear: useCallback(() => dispatch(clearCompleted()), []),
  }

  const renders = {
    item: useCallback((item: ITodo) => (
      <TodoItem item={item} toggle={callbacks.onToggle} remove={callbacks.onRemove} />
    ), [callbacks.onToggle, callbacks.onRemove])
  }

  return (
    <Container>
      <Form value={value} setValue={setValue} onSubmit={callbacks.onCreate}/>
      <Controls total={total} filter={filter} setFilter={setFilter} onClear={callbacks.onClear}/>
      <List list={filteredTodos} renderItem={renders.item}/>
    </Container>
  )
}

export default App;