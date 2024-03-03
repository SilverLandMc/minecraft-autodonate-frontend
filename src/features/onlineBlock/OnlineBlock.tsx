import { FunctionComponent, useEffect, useState } from 'react';
import ProgressBar from 'shared/ui/ProgressBar/ProgressBar';
import Spacing from 'shared/ui/spacing/Spacing';
import fetchOnlineInfo from 'pages/MainPage/utils/fetchOnlineInfo';
import { useSelector } from 'react-redux';
import selectOnline from 'shared/redux/selectors/selectOnline';
import useAppDispatch from 'shared/hooks/redux/useAppDispatch';
import RunnerLoader from 'shared/ui/RunnerLoader/RunnerLoader';
import styles from './OnlineBlock.module.scss';

const OnlineBlock: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    const [isOnlineFetching, setIsOnlineFetching] = useState(false);
    const [isServerDown, setIsServerDown] = useState(false);

    const { online: currentOnline, max: maxOnline, isLoaded } = useSelector(selectOnline);
    const percentOnline = (currentOnline / maxOnline) * 100;

    const finishFetchingWithDelay = () => {
        setTimeout(() => setIsOnlineFetching(false), 1400);
    };

    useEffect(() => {
        if (isLoaded) {
            return;
        }

        setIsOnlineFetching(true);

        (async () => {
            try {
                await dispatch(fetchOnlineInfo());
            } catch (error) {
                // По договорённости с бэком считаем, что если запрос упал - сервер лежит
                setIsServerDown(true);
            } finally {
                finishFetchingWithDelay();
            }
        })();
    }, []);

    if (isOnlineFetching) {
        return (
            <div className={styles.runnerWrapper}>
                <RunnerLoader small />
            </div>
        );
    }

    if (isServerDown) {
        return (
            <div className={styles.serverIsDown}>
                Сервер временно недоступен! <br /> Зайдите попозже
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.onlineSubheader}>Онлайн на сервере:</h3>

            <div>
                <ProgressBar percentFilled={percentOnline} />
                <Spacing size={10} />
                <span>
                    {currentOnline} / {maxOnline} чел.
                </span>
            </div>
        </div>
    );
};

export default OnlineBlock;
