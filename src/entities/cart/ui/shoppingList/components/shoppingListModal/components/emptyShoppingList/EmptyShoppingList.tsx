import React, { FunctionComponent, MouseEvent } from 'react';
import { BackgroundColor, ModernButton } from 'shared/ui';
import styles from './EmptyShoppingList.module.scss';

interface Props {
    onClose(event: MouseEvent): void;
}

export const EmptyShoppingList: FunctionComponent<Props> = ({ onClose }) => (
    <>
        <h1 className={styles.header}>Упс.</h1>

        <span className={styles.description}>В вашей корзине пока что ничего нет!</span>

        <ModernButton background={BackgroundColor.GREEN} onClick={onClose}>
            Вернуться в магазин
        </ModernButton>
    </>
);
