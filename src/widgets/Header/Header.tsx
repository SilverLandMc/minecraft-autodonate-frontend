import { FunctionComponent } from 'react';
import Section from 'shared/ui/Section/Section';
import silverLandLogo from './images/silverLandLogo.png';
import styles from './Header.module.scss';
import { NavBar } from 'widgets/NavBar';

interface HeaderProps {
    className?: string;
}

const Header: FunctionComponent<HeaderProps> = () => {
    return (
        <div className={styles.backgroundWrapper}>
            <Section className={styles.section}>
                <div className={styles.innerRowWrapper}>
                    <img src={silverLandLogo} className={styles.logo} alt="SilverLand Minecraft server" />
                    <NavBar />
                </div>
            </Section>
        </div>
    );
};

export default Header;
