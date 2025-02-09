import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import useMediaContext from 'shared/hooks/useMediaContext';
import Section from 'shared/ui/section/Section';
import ShoppingList from 'widgets/ShoppingList/ShoppingList';
import silverLandLogo from '@/shared/assets/silverlandLogo.svg';
import { ButterMenu } from './components/ButterMenu/ButterMenu';
import { NavBar } from './components/NavBar/NavBar';
import styles from './Header.module.scss';

export const Header: FunctionComponent = () => {
    const navigate = useNavigate();

    const { isDesktop } = useMediaContext();

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
                    {isDesktop ? <NavBar /> : <ButterMenu />}

                    <ShoppingList />
                </div>
            </div>
        </Section>
    );
};
