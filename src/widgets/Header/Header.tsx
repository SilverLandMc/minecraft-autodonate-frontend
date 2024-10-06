import media from 'app/const/enum/Media';
import { NavBar } from 'features/NavBar';
import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import useDoesMediaMatch from 'shared/hooks/useDoesMediaMatch';
import Section from 'shared/ui/Section/Section';
import ButterMenu from 'widgets/ButterMenu/ButterMenu';
import ShoppingList from 'widgets/ShoppingList/ShoppingList';
import styles from './Header.module.scss';
import silverLandLogo from './images/silverLandLogo.png';

interface HeaderProps {
    className?: string;
}

const Header: FunctionComponent<HeaderProps> = () => {
    const navigate = useNavigate();
    const isMobile = useDoesMediaMatch(media.XS);

    const navigateToAdminPanel = () => {
        navigate(RoutePath['auth']);
    };

    return (
        <div className={styles.backgroundWrapper}>
            <Section className={styles.section}>
                <div className={styles.innerRowWrapper}>
                    <img
                        src={silverLandLogo}
                        className={styles.logo}
                        alt="SilverLand Minecraft server"
                        onDoubleClick={navigateToAdminPanel}
                    />

                    <div className={styles.rightBlock}>
                        {isMobile ? <ButterMenu /> : <NavBar />}
                        <ShoppingList />
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Header;
