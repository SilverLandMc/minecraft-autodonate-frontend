import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './ModalBackground.module.scss';

interface Props extends PropsWithChildren {
    className?: string;
}

const ModalBackground: FunctionComponent<Props> = ({ children }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.close} />
                {children}
            </div>
        </div>
    );
};

export default ModalBackground;
