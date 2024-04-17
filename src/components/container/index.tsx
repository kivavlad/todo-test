import {ReactNode, memo} from 'react';
import styles from './style.module.css';

interface IProps {
  children: ReactNode;
}

const Container: React.FC<IProps> = ({children}) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default memo(Container);