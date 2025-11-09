import { FunctionComponent, PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/aliases';
import closeIcon from './images/closeIcon.svg';
import styles from './ModalBackground.module.scss';

interface Props extends PropsWithChildren {
    closing?: boolean;
}

export const ModalBackground: FunctionComponent<Props> = ({ closing: isClosing, children }) => (
    <div className={classNames(styles.modal, { [styles.isClosing]: isClosing })}>
        <div className={styles.modalContent}>
            <img className={styles.close} src={closeIcon} alt="Закрыть" />

            {children}
        </div>
    </div>
);
