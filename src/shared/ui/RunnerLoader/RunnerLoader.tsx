import { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import spinnerImage from './images/runningSteve.gif';
import styles from './RunnerLoader.module.scss';

interface Props {
    className?: string;
}

const RunnerLoader: FunctionComponent<Props> = ({ className }) => {
    return (
        <div className={classNames(styles.wrapper, [className])}>
            <div className={styles.runnerWrapper}>
                <img src={spinnerImage} className={styles.spinner} alt="Загрузка..." />
            </div>

            <h2 className={styles.description}>Загрузка...</h2>
        </div>
    );
};

export default RunnerLoader;
