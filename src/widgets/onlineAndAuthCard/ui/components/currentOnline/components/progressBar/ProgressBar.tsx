import { max } from 'lodash-es';
import { FunctionComponent } from 'react';
import styles from './ProgressBar.module.scss';

// Процент минимально возможного заполнения прогрессбара
const MIN_FILL_PERCENT = 3;

interface Props {
    percentFilled: number;
}

/**
 * Компонент прогрессбара. Заполняется цветами со сложным паттерном, подобным текстуре травы.
 * Заполнение реализовано средствами CSS.
 *
 * Если переданный процент заполнения ниже такового в константе `MIN_FILL_PERCENT`, он будет перезаписан её значением.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {number} props.percentFilled - процент заполнения прогрессбара
 */
export const ProgressBar: FunctionComponent<Props> = ({ percentFilled }) => {
    percentFilled = max([percentFilled, MIN_FILL_PERCENT])!;

    return (
        <div className={styles.progressBar}>
            <div className={styles.filament} style={{ width: `${percentFilled}%` }} />
        </div>
    );
};
