import React, { FunctionComponent, MouseEvent } from 'react';
import chestImage from 'shared/assets/chest.png';
import Button from 'shared/ui/Button/Button';
import styles from './EmptyShoppingList.module.scss';

interface Props {
    onClose(event: MouseEvent): void;
}

const EmptyShoppingList: FunctionComponent<Props> = ({ onClose }) => (
    <>
        <h1 className={styles.emptyListSubheader}>Упс.</h1>

        <div className={styles.emptyListImageBLock}>
            <img src={chestImage} className={styles.chestImage} alt="Корзина пуста!" />
            <span className={styles.emptyListDescription}>В вашей корзине пока что ничего нет!</span>
        </div>

        <Button className={styles.button} onClick={onClose}>
            Вернуться в магазин
        </Button>
    </>
);

export default EmptyShoppingList;
