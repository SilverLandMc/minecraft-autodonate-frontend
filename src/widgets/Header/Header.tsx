import React, { FunctionComponent } from 'react';
import Section from 'shared/ui/Section/Section';
import silverLandLogo from './images/silverLandLogo.png';
import { NavBar } from 'features/NavBar';
import useDoesMediaMatch from 'shared/hooks/useDoesMediaMatch';
import media from 'app/const/enum/Media';
import ButterMenu from 'widgets/ButterMenu/ButterMenu';
import { AppRoutes as AppRoute, RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

interface HeaderProps {
    className?: string;
}

const Header: FunctionComponent<HeaderProps> = () => {
    const isMobile = useDoesMediaMatch(media.XS);

    return (
        <div className={styles.backgroundWrapper}>
            <Section className={styles.section}>
                <div className={styles.innerRowWrapper}>
                    <Link to={RoutePath[AppRoute.MAIN]}>
                        <img src={silverLandLogo} className={styles.logo} alt="SilverLand Minecraft server" />
                    </Link>

                    {isMobile ? <ButterMenu /> : <NavBar />}
                </div>
            </Section>
        </div>
    );
};

export default Header;
