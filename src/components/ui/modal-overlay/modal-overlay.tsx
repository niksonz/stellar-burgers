import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => (
<<<<<<< HEAD
  <div data-cy='overlay' className={styles.overlay} onClick={onClick} />
=======
  <div className={styles.overlay} onClick={onClick} data-cy='modal-overlay' />
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
);
