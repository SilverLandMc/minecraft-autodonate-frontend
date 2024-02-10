import { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import spinnerImage from './images/runningSteve.gif';
import styles from './RunnerLoader.module.scss';

interface Props {
    small?: boolean;
    className?: string;
}

const RunnerLoader: FunctionComponent<Props> = ({ small: isSmall, className }) => {
    return (
        <div className={classNames(styles.wrapper, [className], { [styles.isSmall]: isSmall })}>
            <div className={styles.runnerWrapper}>
                <img src={spinnerImage} className={styles.runningMan} alt="Загрузка..." />
            </div>

            <h2 className={styles.description}>Загрузка...</h2>
        </div>
    );
};

export default RunnerLoader;
