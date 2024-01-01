import { FunctionComponent } from 'react';
import Section from 'shared/ui/Section/Section';
import silverLandLogo from './images/silverLandLogo.png';
import styles from './Header.module.scss';

interface HeaderProps {
    className?: string;
}

const Header: FunctionComponent<HeaderProps> = () => {
    return (
        <div className={styles.backgroundWrapper}>
            <Section className={styles.section}>
                <div className={styles.wrapper}>
                    <img src={silverLandLogo} className={styles.logo} alt="SilverLand Minecraft server" />
                </div>
            </Section>
        </div>
    );
};

export default Header;
