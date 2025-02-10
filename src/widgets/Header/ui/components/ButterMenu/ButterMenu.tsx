import React, { FunctionComponent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useClickAway } from 'react-use';
import { AppRoutes as AppRoute, RoutePath } from '@/shared/config/routeConfig/routeConfig';
import classNames from '@/shared/lib/aliases/classNames';
import { BackgroundColor, ModernButton, Optional, OutlineColor } from '@/shared/ui';
import butterIcon from './images/butterIcon.svg';
import closeIcon from './images/closeIconWhite.svg';
import styles from './ButterMenu.module.scss';

export const ButterMenu: FunctionComponent = () => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const openModal = () => setIsOpened(true);

    const closeModal = () => setIsOpened(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    useClickAway(wrapperRef, closeModal);

    return (
        <>
            <img
                src={isOpened ? closeIcon : butterIcon}
                className={classNames(styles.butterMenu)}
                alt="Меню"
                onClick={isOpened ? closeModal : openModal}
            />

            <Optional visible={isOpened}>
                <div ref={wrapperRef} className={styles.buttonsWrapper}>
                    <Link to={RoutePath[AppRoute.SHOP]} onClick={closeModal}>
                        <ModernButton
                            className={styles.button}
                            background={BackgroundColor.TRANSPARENT}
                            outline={OutlineColor.RED}
                        >
                            Магазин
                        </ModernButton>
                    </Link>

                    <Link to={RoutePath[AppRoute.SHOP]} onClick={closeModal}>
                        <ModernButton className={styles.button} background={BackgroundColor.RED}>
                            Корзина
                        </ModernButton>
                    </Link>
                </div>
            </Optional>
        </>
    );
};
