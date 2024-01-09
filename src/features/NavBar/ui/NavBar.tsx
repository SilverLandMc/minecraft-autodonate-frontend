import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes as AppRoute, RoutePath } from 'shared/config/routeConfig/routeConfig';
import homeIcon from './images/homeIcon.png';
import ranksIcon from './images/ranksIcon.png';
import boostersIcon from './images/boostersIcon.png';
import chestsIcon from './images/chestsIcon.png';
import resourcesIcon from './images/resourcesIcon.png';
import styles from './NavBar.module.scss';
import classNames from 'shared/lib/aliases/classNames';

interface Props {
    closing?: boolean;
}

const NavBar: FunctionComponent<Props> = ({ closing: isClosing }) => {
    return (
        <div className={classNames(styles.navBar, { [styles.isClosing]: isClosing })}>
            <div className={styles.linkContainer}>
                <div className={styles.iconContainer}>
                    <img src={homeIcon} className={styles.icon} alt="Главная" />
                </div>

                <Link to={RoutePath[AppRoute.MAIN]} className={styles.link}>
                    Главная
                </Link>
            </div>

            <div className={styles.linkContainer}>
                <div className={styles.iconContainer}>
                    <img src={ranksIcon} className={styles.icon} alt="Ранги" />
                </div>

                <Link to={RoutePath[AppRoute.RANKS]} className={styles.link}>
                    Ранги
                </Link>
            </div>

            <div className={styles.linkContainer}>
                <div className={styles.iconContainer}>
                    <img src={boostersIcon} className={styles.icon} alt="Бустеры" />
                </div>

                <Link to={RoutePath[AppRoute.RANKS]} className={styles.link}>
                    Бустеры
                </Link>
            </div>

            <div className={styles.linkContainer}>
                <div className={styles.iconContainer}>
                    <img src={chestsIcon} className={styles.icon} alt="Сундуки" />
                </div>

                <Link to={RoutePath[AppRoute.RANKS]} className={styles.link}>
                    Сундуки
                </Link>
            </div>

            <div className={styles.linkContainer}>
                <div className={styles.iconContainer}>
                    <img src={resourcesIcon} className={styles.icon} alt="Ресурсы" />
                </div>

                <Link to={RoutePath[AppRoute.RANKS]} className={styles.link}>
                    Ресурсы
                </Link>
            </div>
        </div>
    );
};

export default NavBar;
