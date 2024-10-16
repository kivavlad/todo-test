import {memo} from "react";
import { ITodo } from "../../store/todos/types/todos";
import styles from './style.module.css';

interface IProps {
  list: ITodo[];
  renderItem: (item: ITodo) => React.ReactNode;
}

const List: React.FC<IProps> = ({list, renderItem}) => {
  return (
    <div className={styles.list}>{
      list.map((item: ITodo) =>
        <div key={item.id}>
          {renderItem(item)}
        </div>
      )}
    </div>
  )
}

export default memo(List);