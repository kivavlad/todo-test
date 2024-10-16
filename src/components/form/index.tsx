import {FormEvent, memo} from 'react';
import styles from './style.module.css';

interface IProps {
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
}

const Form: React.FC<IProps> = ({value, setValue, onSubmit}) => {

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (value.trim()) {
      onSubmit();
      setValue('');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input type='text'
        placeholder='Add new todo ...'
        value={value}
        onChange={e => setValue(e.target.value)}
      />

      <button type='submit'>
        Create
      </button>
    </form>
  )
}

export default memo(Form);