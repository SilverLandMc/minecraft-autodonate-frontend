import { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import Section from 'shared/ui/Section/Section';
import Spacing from 'shared/ui/spacing/Spacing';
import RoundedSingleFieldForm from 'shared/ui/RoundedSingleFieldForm/RoundedSingleFieldForm';
import styles from './NicknameBlock.module.scss';

interface Props {
    className?: string;
}

const NicknameBlock: FunctionComponent<Props> = ({ className }) => {
    return (
        <div className={classNames(styles.backgroundWrapper, [className])}>
            <Section className={styles.section}>
                <Spacing size={120} sizeL={230} />

                <h1 className={styles.header}>SilverLand</h1>

                <Spacing size={8} />

                <h2 className={styles.subHeader}>Minecraft Server</h2>

                <Spacing size={20} />

                <span className={styles.enterProposal}>Введите ваш ник:</span>

                <Spacing size={8} />

                <RoundedSingleFieldForm className={styles.nicknameForm} placeholderText="Например, BrainRTP" />

                <Spacing size={120} sizeL={230} />
            </Section>
        </div>
    );
};

export default NicknameBlock;
