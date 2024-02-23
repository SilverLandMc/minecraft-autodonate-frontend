import React, { FunctionComponent, MouseEvent, useContext, useRef, useState } from 'react';
import cartImage from './images/cartIcon.png';
import { AppContext } from 'app/providers/AppContextProvider';
import ModalBackground from 'shared/ui/ModalBackground/ModalBackground';
import classNames from 'shared/lib/aliases/classNames';
import Button from 'shared/ui/Button/Button';
import Portal from 'shared/ui/Portal/Portal';
import { useClickAway } from 'react-use';
import { Time } from 'app/const/enum/Time';
import Spacing from 'shared/ui/spacing/Spacing';
import chestImage from 'shared/assets/chest.png';
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

    const { productsToBuy, getProductsListPrice, addOrIncrementProductToList, decrementProductAmountInList } =
        useContext(AppContext);
    const totalListPrice = getProductsListPrice();

    const incrementProduct = (productId: string, name: string, displayedPrice: number) => () => {
        addOrIncrementProductToList(productId, name, displayedPrice);
    };

    const decrementProduct = (productId: string) => () => {
        decrementProductAmountInList(productId);
    };

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
                    <ModalBackground closing={isClosing} fullScreenAtMobile>
                        <div ref={wrapperRef} className={styles.modalWrapper}>
                            {productsToBuy.length > 0 ? (
                                <>
                                    <h2 className={styles.header}>Ваша корзина:</h2>

                                    <div className={styles.table}>
                                        <div>
                                            <div className={styles.productRow}>
                                                <div className={classNames(styles.cell, styles.name, styles.bold)}>
                                                    Товар:
                                                </div>

                                                <div className={classNames(styles.cell, styles.amount, styles.bold)}>
                                                    Шт.:
                                                </div>

                                                <div className={classNames(styles.cell)}></div>

                                                <div
                                                    className={classNames(
                                                        styles.cell,
                                                        styles.productTotalPrice,
                                                        styles.bold
                                                    )}
                                                >
                                                    Итог:
                                                </div>
                                            </div>

                                            {productsToBuy.map((product) => {
                                                const { id: productId, name, amount, displayedPrice } = product;

                                                return (
                                                    <div key={productId} className={styles.productRow}>
                                                        <div className={classNames(styles.cell, styles.name)}>
                                                            {name}
                                                        </div>

                                                        <div className={classNames(styles.cell, styles.amount)}>
                                                            x{amount}
                                                        </div>

                                                        <div className={classNames(styles.cell)}>
                                                            <button
                                                                className={styles.incrementButton}
                                                                onClick={incrementProduct(
                                                                    productId,
                                                                    name,
                                                                    displayedPrice
                                                                )}
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                className={styles.decrementButton}
                                                                onClick={decrementProduct(productId)}
                                                            >
                                                                -
                                                            </button>
                                                        </div>

                                                        <div
                                                            className={classNames(
                                                                styles.cell,
                                                                styles.productTotalPrice
                                                            )}
                                                        >
                                                            {(displayedPrice * amount).toFixed(1)} ₽
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <Spacing size={20} />

                                        <div className={styles.totalListPrice}>
                                            <span className={styles.totalListPriceDescription}>Итого: </span>
                                            {totalListPrice.toFixed(1)} ₽
                                        </div>
                                    </div>

                                    <Button className={styles.button}>Купить</Button>
                                </>
                            ) : (
                                <>
                                    <h1 className={styles.emptyListSubheader}>Упс.</h1>

                                    <div className={styles.emptyListImageBLock}>
                                        <img src={chestImage} className={styles.chestImage} alt="Корзина пуста!" />
                                        <span className={styles.emptyListDescription}>
                                            В вашей корзине пока что ничего нет!
                                        </span>
                                    </div>

                                    <Button className={styles.button} onClick={closeModal}>
                                        Вернуться в магазин
                                    </Button>
                                </>
                            )}
                        </div>
                    </ModalBackground>
                </Portal>
            )}
        </>
    );
};

export default ShoppingList;
