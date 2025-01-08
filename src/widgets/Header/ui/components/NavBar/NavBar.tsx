import React, { FunctionComponent, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes as AppRoute, RoutePath } from 'shared/config/routeConfig/routeConfig';
import classNames from 'shared/lib/aliases/classNames';
import styles from './NavBar.module.scss';

interface Props {
    onClose?(event: MouseEvent): void;
    closing?: boolean;
}

export const NavBar: FunctionComponent<Props> = ({ onClose, closing: isClosing }) => {
    const currentPath = useLocation().pathname;

    return (
        <div className={classNames(styles.navBar, { [styles.isClosing]: isClosing })}>
            <div className={styles.linkContainer}>
                <Link
                    to={RoutePath[AppRoute.SHOP]}
                    className={classNames(styles.link, {
                        [styles.isActive]: currentPath === RoutePath[AppRoute.SHOP]
                    })}
                    onClick={onClose}
                >
                    Магазин
                </Link>
            </div>
        </div>
    );
};
