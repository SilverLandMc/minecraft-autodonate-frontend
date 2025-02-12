import { FunctionComponent } from 'react';
import Section from 'shared/ui/section/Section';
import Spacing from 'shared/ui/spacing/Spacing';
import CopyServerUrlBlock from 'widgets/PlayerAndServerInfoBlock/components/copyServerUrlBlock/CopyServerUrlBlock';
import { UserAuthBlock } from '@/entities/user';
import OnlineBlock from './components/onlineBlock/OnlineBlock';
import styles from './PlayerAndServerInfoBlock.module.scss';

const PlayerAndServerInfoBlock: FunctionComponent = () => (
    <Section className={styles.card}>
        <Spacing size={60} sizeL={230} />

        <div className={styles.innerWrapper}>
            <div className={styles.firstBlock}>
                <div>
                    <h1 className={styles.header}>SilverLand</h1>

                    <Spacing size={8} />

                    <h2 className={styles.subHeader}>Minecraft Server</h2>
                </div>

                <UserAuthBlock subheaderClassName={styles.enterProposal} />
            </div>

            <div className={styles.secondBlock}>
                <OnlineBlock />

                <CopyServerUrlBlock />
            </div>
        </div>

        <Spacing size={60} sizeL={230} />
    </Section>
);

export default PlayerAndServerInfoBlock;
