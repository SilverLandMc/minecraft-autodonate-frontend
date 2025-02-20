import { FunctionComponent } from 'react';
import { CurrentOnline } from 'widgets/PlayerAndServerInfoBlock/ui/components/currentOnline/CurrentOnline';
import { UserAuthBlock } from '@/entities/user';
import silverLandLogo from '@/shared/assets/silverlandLogo.svg';
import useMediaContext from '@/shared/hooks/useMediaContext';
import { Optional } from '@/shared/ui';
import Section from '@/shared/ui/section/Section';
import Spacing from '@/shared/ui/spacing/Spacing';
import CopyServerUrlBlock from './components/copyServerUrlBlock/CopyServerUrlBlock';
import azureCubesImage from './images/azureCubes.png';
import styles from './PlayerAndServerInfoBlock.module.scss';

export const PlayerAndServerInfoBlock: FunctionComponent = () => {
    const { isMobile } = useMediaContext();

    return (
        <Section className={styles.card}>
            <img className={styles.cubes} src={azureCubesImage} alt="azure cubes" />
            <Spacing size={84} sizeS={72} sizeL={126} />

            <div className={styles.innerWrapper}>
                <div className={styles.firstBlock}>
                    <h1 className={styles.header}>Minecraft Server</h1>

                    <Spacing size={8} sizeS={16} sizeM={20} sizeL={22} />

                    <img className={styles.logo} src={silverLandLogo} alt="Silverland" />

                    <Optional visible={!isMobile}>
                        <Spacing size={0} sizeS={32} sizeM={40} sizeL={65} />
                        <UserAuthBlock />
                    </Optional>
                </div>

                <div className={styles.secondBlock}>
                    <CurrentOnline />
                    <Spacing size={20} sizeS={46} sizeM={58} sizeL={68} />
                    <CopyServerUrlBlock />
                </div>
            </div>

            <Spacing size={24} sizeS={72} sizeL={126} />
        </Section>
    );
};
