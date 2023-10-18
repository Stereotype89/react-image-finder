import css from './Modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Modal({ image, description, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', closeModalWindow);

    return () => {
      window.removeEventListener('keydown', closeModalWindow);
    };
  });

  const closeModalWindow = event => {
    if (event.code === 'Escape' || event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={closeModalWindow}>
      <div className={css.modal}>
        <img src={image} alt={description} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
