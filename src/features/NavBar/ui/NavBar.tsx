import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes as AppRoute, RoutePath } from 'shared/config/routeConfig/routeConfig';
import classNames from 'shared/lib/aliases/classNames';
import homeIcon from './images/homeIcon.png';
import ranksIcon from './images/ranksIcon.png';
import boostersIcon from './images/boostersIcon.png';
import chestsIcon from './images/chestsIcon.png';
import resourcesIcon from './images/resourcesIcon.png';
import styles from './NavBar.module.scss';

export const NavBar: FunctionComponent = () => {
    return (
        <div className={classNames(styles.navBar)}>
            <div className={styles.linkContainer}>
                <img src={homeIcon} className={styles.icon} alt="Главная" />
                <Link to={RoutePath[AppRoute.MAIN]} className={styles.link}>
                    Главная
                </Link>
            </div>

            <div className={classNames(styles.linkContainer)}>
                <img src={ranksIcon} className={styles.icon} alt="Ранги" />
                <Link to={RoutePath[AppRoute.RANKS]} className={styles.link}>
                    Ранги
                </Link>
            </div>

            <div className={classNames(styles.linkContainer)}>
                <img src={boostersIcon} className={styles.icon} alt="Бустеры" />
                <Link to={RoutePath[AppRoute.RANKS]} className={styles.link}>
                    Бустеры
                </Link>
            </div>

            <div className={classNames(styles.linkContainer)}>
                <img src={chestsIcon} className={styles.icon} alt="Сундуки" />
                <Link to={RoutePath[AppRoute.RANKS]} className={styles.link}>
                    Сундуки
                </Link>
            </div>

            <div className={classNames(styles.linkContainer)}>
                <img src={resourcesIcon} className={styles.icon} alt="Ресурсы" />
                <Link to={RoutePath[AppRoute.RANKS]} className={styles.link}>
                    Ресурсы
                </Link>
            </div>
        </div>
    );
};
