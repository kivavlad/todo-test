import {memo} from "react";
import {plural} from "../../utils/utils";
import styles from './style.module.css';

interface IProps {
  total: number;
  filter: string;
  handleCLick: (arg: string) => void;
  clear: () => void;
}

const Controls: React.FC<IProps> = ({total, filter, handleCLick, clear}) => {
  const variants = {one: 'item', few: 'items', many: 'items'};

  return (
    <div className={styles.controls}>
      <div className={styles.counter}>{plural(total, variants)}</div>

      <div className={styles.options}>
        <button type='button' 
          className={filter === 'all' ? styles.button_active : styles.button} 
          onClick={() => handleCLick('all')}
        >
          All
        </button>
        <button type='button' 
          className={filter === 'active' ? styles.button_active : styles.button}
          onClick={() => handleCLick('active')}
        >
          Active
        </button>
        <button type='button' 
          className={filter === 'completed' ? styles.button_active : styles.button}
          onClick={() => handleCLick('completed')}
        >
          Completed
        </button>
      </div>

      <div className={styles.clear}>
        <button type='button' onClick={clear}>Clear completed</button>
      </div>
    </div>
  )
}

export default memo(Controls);