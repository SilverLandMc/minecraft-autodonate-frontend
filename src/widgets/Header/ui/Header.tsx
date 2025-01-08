import media from 'app/const/enum/Media';
import { FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import useDoesMediaMatch from 'shared/hooks/useDoesMediaMatch';
import { Optional } from 'shared/ui';
import Section from 'shared/ui/Section/Section';
import ShoppingList from 'widgets/ShoppingList/ShoppingList';
import silverLandLogo from '@/shared/assets/silverlandLogo.svg';
import { ButterMenu } from './components/ButterMenu/ButterMenu';
import { NavBar } from './components/NavBar/NavBar';
import styles from './Header.module.scss';

export const Header: FunctionComponent = () => {
    const navigate = useNavigate();
    const currentPath = useLocation().pathname;

    const isMobile = useDoesMediaMatch(media.XS);
    const isShopPage = currentPath === AppRoutes.SHOP;

    const navigateToMainPage = () => navigate(RoutePath['main']);
    const navigateToAdminPanel = () => navigate(RoutePath['auth']);

    return (
        <Section className={styles.wrapper}>
            <div className={styles.innerRowWrapper}>
                <img
                    src={silverLandLogo}
                    className={styles.logo}
                    alt="SilverLand Minecraft server"
                    onClick={navigateToMainPage}
                    onDoubleClick={navigateToAdminPanel}
                />

                <div className={styles.rightBlock}>
                    {isMobile ? <ButterMenu /> : <NavBar />}
                    <Optional visible={isShopPage}>
                        <ShoppingList />
                    </Optional>
                </div>
            </div>
        </Section>
    );
};
