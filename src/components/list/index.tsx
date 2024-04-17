import {ReactNode, memo} from "react";
import {ITodo} from "../../types";
import styles from './style.module.css';

interface IProps {
  list: ITodo[];
  renderItem: (arg: ITodo) => ReactNode;
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