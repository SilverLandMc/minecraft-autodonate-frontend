import { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import Section from 'shared/ui/Section/Section';
import Spacing from 'shared/ui/spacing/Spacing';
import RoundedSingleFieldForm from 'shared/ui/RoundedSingleFieldForm/RoundedSingleFieldForm';
import styles from './NicknameBlock.module.scss';
import ProgressBar from 'shared/ui/ProgressBar/ProgressBar';

interface Props {
    className?: string;
}

const NicknameBlock: FunctionComponent<Props> = ({ className }) => {
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
                            <ProgressBar percentFilled={0} />
                            <Spacing size={10} />
                            <span>0 / 100 чел.</span>
                        </div>
                    </div>
                </div>

                <Spacing size={60} sizeL={230} />
            </Section>
        </div>
    );
};

export default NicknameBlock;
