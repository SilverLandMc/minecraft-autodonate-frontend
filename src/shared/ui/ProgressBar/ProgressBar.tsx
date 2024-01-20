import { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './ProgressBar.module.scss';

interface Props {
    percentFilled: number;
    backgroundColor?: string;
    filamentColor?: string;
    className?: string;
}

const ProgressBar: FunctionComponent<Props> = ({
    percentFilled,
    backgroundColor = '#9296a8',
    filamentColor = '#6277e3',
    className
}) => {
    percentFilled = percentFilled || 3;
    return (
        <div className={classNames(styles.progressBar, [className])} style={{ background: backgroundColor }}>
            <div className={styles.filament} style={{ width: `${percentFilled}%`, background: filamentColor }}></div>
        </div>
    );
};

export default ProgressBar;
