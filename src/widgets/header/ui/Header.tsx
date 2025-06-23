import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingList from '@/widgets/shoppingList/shoppingList';
import silverLandLogo from '@/shared/assets/silverlandLogo.svg';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import useMediaContext from '@/shared/hooks/useMediaContext';
import { Section } from '@/shared/ui';
import { ButterMenu } from './components/ButterMenu/ButterMenu';
import { NavBar } from './components/NavBar/NavBar';
import styles from './Header.module.scss';

export const Header: FunctionComponent = () => {
    const navigate = useNavigate();

    const { isMobile } = useMediaContext();

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

                {isMobile ? (
                    <ButterMenu />
                ) : (
                    <div className={styles.rightBlock}>
                        <NavBar />
                        <ShoppingList />
                    </div>
                )}
            </div>
        </Section>
    );
};
