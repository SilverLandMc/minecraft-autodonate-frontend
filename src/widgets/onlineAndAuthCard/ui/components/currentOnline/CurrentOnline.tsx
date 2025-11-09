import { FunctionComponent } from 'react';
import { useAsync } from 'react-use';
import { classNames } from '@/shared/lib/aliases';
import { Spacing } from '@/shared/ui';
import { fetchOnline } from '../../../api/fetchOnlineInfo';
import { ProgressBar } from './components/progressBar/ProgressBar';
import styles from './CurrentOnline.module.scss';

const DEFAULT_CURRENT_ONLINE = 0;
const DEFAULT_MAX_ONLINE = 100;

/**
 * Блок информации о текущем онлайне на сервере.
 * Во время загрузки информации об онлайне или при ошибке запроса показывает "?" вместо цифры текущего онлайна.
 *
 * Предоставляет текстовое отображение информации об онлайне и прогрессбар ниже.
 *
 * @component
 * @see ProgressBar
 */
export const CurrentOnline: FunctionComponent = () => {
    const { loading: isLoading, value: onlineInfo, error } = useAsync(() => fetchOnline(), []);
    const { online = DEFAULT_CURRENT_ONLINE, max = DEFAULT_MAX_ONLINE } = onlineInfo ?? {};

    const percentOnline = (online / max) * 100;

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.onlineSubheader}>Онлайн</h3>

            <Spacing size={8} sizeM={10} />
            <div>
                <span className={classNames(styles.currentOnline, { [styles.isLoading]: isLoading })}>
                    {error || isLoading ? '?' : online}
                </span>{' '}
                <span className={styles.maxOnline}>/{max}</span>
            </div>
            <Spacing size={10} sizeM={14} sizeL={20} />

            <ProgressBar percentFilled={percentOnline} />
        </div>
    );
};
