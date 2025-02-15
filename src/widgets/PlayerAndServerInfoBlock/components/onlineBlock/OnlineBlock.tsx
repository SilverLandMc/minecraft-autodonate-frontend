import fetchOnlineInfo from 'pages/mainPage/utils/fetchOnlineInfo';
import { FunctionComponent } from 'react';
import { useAsync } from 'react-use';
import ProgressBar from 'shared/ui/progressBar/ProgressBar';
import RunnerLoader from 'shared/ui/runnerLoader/RunnerLoader';
import Spacing from 'shared/ui/spacing/Spacing';
import styles from './OnlineBlock.module.scss';

export const OnlineBlock: FunctionComponent = () => {
    const { loading: isLoading, value: onlineInfo, error } = useAsync(() => fetchOnlineInfo(), []);
    const { online = 0, max = 100 } = onlineInfo ?? {};

    const percentOnline = (online / max) * 100;

    if (isLoading) {
        return (
            <div className={styles.runnerWrapper}>
                <RunnerLoader small />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.serverIsDown}>
                Сервер временно недоступен! <br /> Зайдите попозже
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.onlineSubheader}>Онлайн</h3>

            <div>
                <ProgressBar percentFilled={percentOnline} />
                <Spacing size={10} />
                <span>
                    {online} / {max} чел.
                </span>
            </div>
        </div>
    );
};
