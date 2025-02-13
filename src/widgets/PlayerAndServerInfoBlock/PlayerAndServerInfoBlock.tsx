import { FunctionComponent } from 'react';
import useMediaContext from 'shared/hooks/useMediaContext';
import { Optional } from 'shared/ui';
import Section from 'shared/ui/section/Section';
import Spacing from 'shared/ui/spacing/Spacing';
import CopyServerUrlBlock from 'widgets/PlayerAndServerInfoBlock/components/copyServerUrlBlock/CopyServerUrlBlock';
import { UserAuthBlock } from '@/entities/user';
import OnlineBlock from './components/onlineBlock/OnlineBlock';
import azureCubesImage from './images/azureCubes.png';
import styles from './PlayerAndServerInfoBlock.module.scss';

const PlayerAndServerInfoBlock: FunctionComponent = () => {
    const { isMobile } = useMediaContext();

    return (
        <Section className={styles.card}>
            <img className={styles.cubes} src={azureCubesImage} alt="" />
            <Spacing size={84} sizeS={72} sizeL={126} />

            <div className={styles.innerWrapper}>
                <div className={styles.firstBlock}>
                    <div>
                        <h1 className={styles.header}>Minecraft Server</h1>

                        <Spacing size={8} />

                        <h2 className={styles.subHeader}>Minecraft Server</h2>
                    </div>

                    <Optional visible={!isMobile}>
                        <UserAuthBlock subheaderClassName={styles.enterProposal} />
                    </Optional>
                </div>

                <div className={styles.secondBlock}>
                    <OnlineBlock />

                    <CopyServerUrlBlock />
                </div>
            </div>

            <Spacing size={24} sizeS={72} sizeL={126} />
        </Section>
    );
};

export default PlayerAndServerInfoBlock;
