import React, { FunctionComponent, MouseEvent, useContext, useRef, useState } from 'react';
import cartImage from './images/cartIcon.png';
import { AppContext } from 'app/providers/AppContextProvider';
import ModalBackground from 'shared/ui/ModalBackground/ModalBackground';
import classNames from 'shared/lib/aliases/classNames';
import Button from 'shared/ui/Button/Button';
import Portal from 'shared/ui/Portal/Portal';
import { useClickAway } from 'react-use';
import { Time } from 'app/const/enum/Time';
import styles from './ShoppingList.module.scss';

const ShoppingList: FunctionComponent = () => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);
    const openModal = () => setIsModalOpened(true);
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
            setIsModalOpened(false);
        }, Time.MODAL_CLOSE_ANIMATION_DURATION);
    };

    const { productsToBuy } = useContext(AppContext);

    const wrapperRef = useRef<HTMLDivElement>(null);
    useClickAway(wrapperRef, (event) => closeModal(event as unknown as MouseEvent));

    return (
        <>
            <div className={styles.cartWrapper} onClick={openModal}>
                <img src={cartImage} className={styles.cartImage} alt="Корзина" />
                {Boolean(productsToBuy.length) && <div className={styles.cartNumber}>{productsToBuy.length}</div>}
            </div>

            {isModalOpened && (
                <Portal>
                    <ModalBackground closing={isClosing}>
                        <div ref={wrapperRef} className={styles.modalWrapper}>
                            <h2 className={styles.header}>Ваша корзина:</h2>

                            <div className={styles.table}>
                                {productsToBuy.map((product, index) => (
                                    <div className={styles.productRow}>
                                        <div className={classNames(styles.cell, styles.numberInList)}>{index + 1}</div>
                                        <div className={classNames(styles.cell, styles.name)}>{product.name}</div>
                                        <div className={classNames(styles.cell, styles.price)}>
                                            {product.displayedPrice.toFixed(2)} руб.
                                        </div>
                                        <div className={classNames(styles.cell, styles.amount)}>x{product.amount}</div>
                                        <div className={classNames(styles.cell, styles.productTotalPrice)}>
                                            {(product.displayedPrice * product.amount).toFixed(2)} руб.
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button className={styles.button}>Купить</Button>
                        </div>
                    </ModalBackground>
                </Portal>
            )}
        </>
    );
};

export default ShoppingList;
