import { Time } from 'app/const/enum/Time';
import React, { FunctionComponent, MouseEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useClickAway } from 'react-use';
import { AppRoutes as AppRoute, RoutePath } from 'shared/config/routeConfig/routeConfig';
import classNames from 'shared/lib/aliases/classNames';
import { BackgroundColor, ModernButton, Optional, OutlineColor } from 'shared/ui';
import butterIcon from './images/butterIcon.svg';
import styles from './ButterMenu.module.scss';

export const ButterMenu: FunctionComponent = () => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);

    const openModal = () => setIsOpened(true);

    const closeModal = (event: MouseEvent) => {
        // useClickAway триггерится на события touchstart и click, из-за чего происходит закрытие и моментальное открытие
        // модального окна, если клик был совершён по области крестика закрытия модалки (а под ней расположен бутерброд)
        // Поэтому ничего не делаем для touchstart
        if (event.type === 'touchstart') {
            return;
        }

        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setIsOpened(false);
        }, Time.MODAL_CLOSE_ANIMATION_DURATION);
    };

    const wrapperRef = useRef<HTMLDivElement>(null);
    useClickAway(wrapperRef, (event) => closeModal(event as unknown as MouseEvent));

    return (
        <>
            <img src={butterIcon} className={classNames(styles.butterMenu)} alt="Меню" onClick={openModal} />

            <Optional visible={isOpened}>
                <div ref={wrapperRef} className={styles.buttonsWrapper}>
                    <Link to={RoutePath[AppRoute.SHOP]} onClick={closeModal}>
                        <ModernButton background={BackgroundColor.TRANSPARENT} outline={OutlineColor.RED}>
                            Магазин
                        </ModernButton>
                    </Link>

                    <Link to={RoutePath[AppRoute.SHOP]} onClick={closeModal}>
                        <ModernButton background={BackgroundColor.RED}>Корзина</ModernButton>
                    </Link>
                </div>
            </Optional>
        </>
    );
};
