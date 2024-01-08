import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './ModalBackground.module.scss';

interface Props extends PropsWithChildren {
    onClose(): void;
    className?: string;
}

const ModalBackground: FunctionComponent<Props> = ({ onClose, children }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.close} onClick={onClose} />
                {children}
            </div>
        </div>
    );
};

export default ModalBackground;
