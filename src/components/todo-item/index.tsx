import {memo} from "react";
import {ITodo} from "../../store/todos/types/todos";
import {checkboxIcon, emptyCheckboxIcon, removeIcon} from '../../assets';
import styles from './style.module.css';

interface ITodoItem {
  item: ITodo;
  toggle: (id: number) => void;
  remove: (id: number) => void;
}

const TodoItem: React.FC<ITodoItem> = ({item, toggle, remove}) => {
  
  const callbacks = {
    onToggle: () => toggle(item.id),
    onRemove: () => remove(item.id),
  }

  return (
    <div className={styles.item}>
      <div className={styles.completed}>
        <button type='button' onClick={callbacks.onToggle}>
          <img src={item.completed ? checkboxIcon : emptyCheckboxIcon} alt=""/>
        </button>
      </div>
      <div className={item.completed ? styles.title_completed : styles.title}>
        {item.title}
      </div>
      <div className={styles.remove}>
        <button type='button' onClick={callbacks.onRemove}>
          <img src={removeIcon} alt="" />
        </button>
      </div>
    </div>
  )
}

export default memo(TodoItem);