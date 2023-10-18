import css from './Loader.module.css';
import { ImSpinner } from 'react-icons/im';

const Loader = () => {
  return (
    <div className={css.loader}>
      <ImSpinner size="40" className={css.icon_spin} />
      Loading...
    </div>
  );
};

export default Loader;
