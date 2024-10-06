import CopyServerUrlBlock from 'features/copyServerUrlBlock/CopyServerUrlBlock';
import OnlineBlock from 'features/onlineBlock/OnlineBlock';
import PlayerInfoBlock from 'features/playerInfoBlock/PlayerInfoBlock';
import { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import Section from 'shared/ui/Section/Section';
import Spacing from 'shared/ui/spacing/Spacing';
import styles from './PlayerAndServerInfoBlock.module.scss';

interface Props {
    className?: string;
}

const PlayerAndServerInfoBlock: FunctionComponent<Props> = ({ className }) => (
    <div className={classNames(styles.backgroundWrapper, [className])}>
        <Section className={styles.section}>
            <Spacing size={60} sizeL={230} />

            <div className={styles.innerWrapper}>
                <div className={styles.firstBlock}>
                    <div>
                        <h1 className={styles.header}>SilverLand</h1>

                        <Spacing size={8} />

                        <h2 className={styles.subHeader}>Minecraft Server</h2>
                    </div>

                    <PlayerInfoBlock subheaderClassName={styles.enterProposal} />
                </div>

                <div className={styles.secondBlock}>
                    <OnlineBlock />

                    <CopyServerUrlBlock />
                </div>
            </div>

            <Spacing size={60} sizeL={230} />
        </Section>
    </div>
);

export default PlayerAndServerInfoBlock;
