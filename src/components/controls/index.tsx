import {memo} from "react";
import {plural} from "../../utils/utils";
import { FilterTodos } from "../../store/todos/types/todos";
import styles from './style.module.css';

interface IProps {
  total: number;
  filter: string;
  setFilter: (param: FilterTodos) => void;
  onClear: () => void;
}

const Controls: React.FC<IProps> = ({total, filter, setFilter, onClear}) => {
  const variants = {one: 'item', few: 'items', many: 'items'};

  return (
    <div className={styles.controls}>
      <div className={styles.counter}>{plural(total, variants)}</div>

      <div className={styles.options}>
        <button type='button' 
          className={filter === 'all' ? styles.button_active : styles.button} 
          onClick={() => setFilter(FilterTodos.ALL)}
        >
          All
        </button>
        <button type='button' 
          className={filter === 'active' ? styles.button_active : styles.button}
          onClick={() => setFilter(FilterTodos.ACTIVE)}
        >
          Active
        </button>
        <button type='button' 
          className={filter === 'completed' ? styles.button_active : styles.button}
          onClick={() => setFilter(FilterTodos.COMPLETED)}
        >
          Completed
        </button>
      </div>

      <div className={styles.clear}>
        <button type='button' onClick={onClear}>Clear completed</button>
      </div>
    </div>
  )
}

export default memo(Controls);