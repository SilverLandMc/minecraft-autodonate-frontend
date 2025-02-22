import { FunctionComponent } from 'react';
import styles from './ProgressBar.module.scss';

interface Props {
    percentFilled: number;
}

export const ProgressBar: FunctionComponent<Props> = ({ percentFilled }) => {
    percentFilled = percentFilled < 3 ? 3 : percentFilled;

    return (
        <div className={styles.progressBar}>
            <div className={styles.filament} style={{ width: `${percentFilled}%` }} />
        </div>
    );
};
