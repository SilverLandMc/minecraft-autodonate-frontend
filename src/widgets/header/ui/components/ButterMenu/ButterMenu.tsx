import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingList } from '@/entities/cart';
import { AppRoutes as AppRoute, RoutePath } from '@/shared/config/routeConfig/routeConfig';
import classNames from '@/shared/lib/aliases/classNames';
import { BackgroundColor, ModernButton, Optional, OutlineColor } from '@/shared/ui';
import butterIcon from './images/butterIcon.svg';
import closeIcon from './images/closeIconWhite.svg';
import styles from './ButterMenu.module.scss';

export const ButterMenu: FunctionComponent = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const toggleExpanded = () => setIsExpanded(!isExpanded);
    const hideMenu = () => setIsExpanded(false);

    return (
        <>
            <img
                src={isExpanded ? closeIcon : butterIcon}
                className={classNames(styles.butterMenu)}
                alt="Меню"
                onClick={toggleExpanded}
            />

            <Optional visible={isExpanded}>
                <div className={styles.buttonsWrapper}>
                    <Link to={RoutePath[AppRoute.SHOP]} onClick={hideMenu}>
                        <ModernButton
                            className={styles.button}
                            background={BackgroundColor.TRANSPARENT}
                            outline={OutlineColor.RED}
                        >
                            Магазин
                        </ModernButton>
                    </Link>

                    <ShoppingList simpleButton />
                </div>
            </Optional>
        </>
    );
};
