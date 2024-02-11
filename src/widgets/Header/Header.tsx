import React, { FunctionComponent, useContext } from 'react';
import Section from 'shared/ui/Section/Section';
import silverLandLogo from './images/silverLandLogo.png';
import { NavBar } from 'features/NavBar';
import useDoesMediaMatch from 'shared/hooks/useDoesMediaMatch';
import media from 'app/const/enum/Media';
import ButterMenu from 'widgets/ButterMenu/ButterMenu';
import { AppRoutes as AppRoute, RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Link } from 'react-router-dom';
import cartImage from './images/cartIcon.png';
import styles from './Header.module.scss';
import { AppContext } from 'app/providers/AppContextProvider';

interface HeaderProps {
    className?: string;
}

const Header: FunctionComponent<HeaderProps> = () => {
    const { productsToBuy } = useContext(AppContext);

    const isMobile = useDoesMediaMatch(media.XS);

    return (
        <div className={styles.backgroundWrapper}>
            <Section className={styles.section}>
                <div className={styles.innerRowWrapper}>
                    <Link to={RoutePath[AppRoute.MAIN]}>
                        <img src={silverLandLogo} className={styles.logo} alt="SilverLand Minecraft server" />
                    </Link>

                    <div className={styles.rightBlock}>
                        {isMobile ? <ButterMenu /> : <NavBar />}
                        <div className={styles.cartWrapper}>
                            <img src={cartImage} className={styles.cartImage} alt="Корзина" />
                            {Boolean(productsToBuy.length) && (
                                <div className={styles.cartNumber}>{productsToBuy.length}</div>
                            )}
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Header;
