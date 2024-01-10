import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './ModalBackground.module.scss';
import classNames from 'shared/lib/aliases/classNames';

interface Props extends PropsWithChildren {
    closing?: boolean;
    className?: string;
}

const ModalBackground: FunctionComponent<Props> = ({ closing: isClosing, children }) => {
    return (
        <div className={classNames(styles.modal, { [styles.isClosing]: isClosing })}>
            <div className={styles.modalContent}>
                <div className={styles.close} />
                {children}
            </div>
        </div>
    );
};

export default ModalBackground;
