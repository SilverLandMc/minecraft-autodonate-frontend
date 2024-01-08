import { FunctionComponent } from 'react';
import Section from 'shared/ui/Section/Section';
import silverLandLogo from './images/silverLandLogo.png';
import styles from './Header.module.scss';
import { NavBar } from 'features/NavBar';
import useDoesMediaMatch from 'shared/hooks/useDoesMediaMatch';
import media from 'app/const/enum/Media';
import ButterMenu from 'widgets/ButterMenu/ButterMenu';

interface HeaderProps {
    className?: string;
}

const Header: FunctionComponent<HeaderProps> = () => {
    const isMobile = useDoesMediaMatch(media.XS);

    return (
        <div className={styles.backgroundWrapper}>
            <Section className={styles.section}>
                <div className={styles.innerRowWrapper}>
                    <img src={silverLandLogo} className={styles.logo} alt="SilverLand Minecraft server" />
                    {isMobile ? <ButterMenu /> : <NavBar />}
                </div>
            </Section>
        </div>
    );
};

export default Header;
