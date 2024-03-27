import { FunctionComponent, useEffect, useState } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './Notification.module.scss';

interface Props {
    message: string;
    type: 'SUCCESS' | 'ERROR';
    displayTime?: number;
    className?: string;
}

const Notification: FunctionComponent<Props> = ({ message, type, displayTime = 3000, className }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), displayTime);
    }, [message]);

    if (isVisible) {
        return (
            <div
                className={classNames(styles.notification, [className], {
                    [styles.error]: type === 'ERROR',
                    [styles.success]: type === 'SUCCESS'
                })}
            >
                <span className={styles.message}>{message}</span>
            </div>
        );
    }
};

export default Notification;
