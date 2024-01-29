import { FunctionComponent, useEffect, useState } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import Section from 'shared/ui/Section/Section';
import Spacing from 'shared/ui/spacing/Spacing';
import RoundedSingleFieldForm from 'shared/ui/RoundedSingleFieldForm/RoundedSingleFieldForm';
import styles from './NicknameBlock.module.scss';
import ProgressBar from 'shared/ui/ProgressBar/ProgressBar';
import { useSelector } from 'react-redux';
import selectOnline from 'shared/redux/selectors/selectOnline';
import fetchOnlineInfo from 'pages/MainPage/utils/fetchOnlineInfo';
import useAppDispatch from 'shared/hooks/redux/useAppDispatch';

interface Props {
    className?: string;
}

const NicknameBlock: FunctionComponent<Props> = ({ className }) => {
    const dispatch = useAppDispatch();

    const [isOnlineFetching, setIsOnlineFetching] = useState(true);
    const [isServerDown, setIsServerDown] = useState(false);

    useEffect(() => {
        setIsOnlineFetching(true);
        try {
            dispatch(fetchOnlineInfo());
        } catch (error) {
            setIsServerDown(true);
        }
        setIsOnlineFetching(false);
    }, []);

    const { online: currentOnline, max: maxOnline } = useSelector(selectOnline);
    const percentOnline = (currentOnline / maxOnline) * 100;

    return (
        <div className={classNames(styles.backgroundWrapper, [className])}>
            <Section className={styles.section}>
                <Spacing size={60} sizeL={230} />

                <div className={styles.innerWrapper}>
                    <div className={styles.firstBlock}>
                        <h1 className={styles.header}>SilverLand</h1>

                        <Spacing size={8} />

                        <h2 className={styles.subHeader}>Minecraft Server</h2>

                        <Spacing size={20} />

                        <span className={styles.enterProposal}>Введите ваш ник:</span>

                        <Spacing size={8} />

                        <RoundedSingleFieldForm className={styles.nicknameForm} placeholderText="Например, BrainRTP" />
                    </div>

                    <div className={styles.secondBlock}>
                        <h3 className={styles.onlineSubheader}>Онлайн на сервере:</h3>

                        <div>
                            <ProgressBar percentFilled={percentOnline} />
                            <Spacing size={10} />
                            <span>
                                {currentOnline} / {maxOnline} чел.
                            </span>
                        </div>
                    </div>
                </div>

                <Spacing size={60} sizeL={230} />
            </Section>
        </div>
    );
};

export default NicknameBlock;
