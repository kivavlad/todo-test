import {useState, useCallback} from 'react';
import {useAppSelector, useAppDispatch} from '../store/hooks';
import {create, toggleComplete, removeTodo, clearCompleted} from '../store/slices/todos';
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
  const [filterValue, setFilterValue] = useState<string>('all');
  const filteredTodos = filterValue === 'all' ? list : list.filter(todo => todo.completed === (filterValue === 'completed'));
  const total = filteredTodos.length;

  const callbacks = {
    // Создание нового todo
    onCreate: useCallback(() => dispatch(create(value)), [list, value]),
    // Переключатель выполнения
    onToggle: useCallback((id: number) => dispatch(toggleComplete(id)), [list]),
    // Удаление todo
    onRemove: useCallback((id: number) => dispatch(removeTodo(id)), [list]),
    // Очистить все выполненные todo
    onClear: useCallback(() => dispatch(clearCompleted()), [list]),
  }

  const renders = {
    item: useCallback((item: ITodo) => (
      <TodoItem item={item} toggle={callbacks.onToggle} remove={callbacks.onRemove} />
    ), [callbacks.onToggle, callbacks.onRemove])
  }

  return (
    <Container>
      <Form value={value} setValue={setValue} onSubmit={callbacks.onCreate}/>
      <Controls total={total} filter={filterValue} handleCLick={setFilterValue} clear={callbacks.onClear}/>
      <List list={filteredTodos} renderItem={renders.item}/>
    </Container>
  )
}

export default App;