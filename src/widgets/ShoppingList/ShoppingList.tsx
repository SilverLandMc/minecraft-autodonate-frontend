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
import trashIcon from 'shared/assets/trashIcon.svg';
import { useSelector } from 'react-redux';
import selectPlayerName from 'shared/redux/selectors/selectPlayerName';
import PlayerInfoBlock from 'features/playerInfoBlock/PlayerInfoBlock';
import PromoCodeBlock from 'features/PromoCodeBlock/PromoCodeBlock';
import useAppDispatch from 'shared/hooks/redux/useAppDispatch';
import { erasePlayerInfo } from 'pages/MainPage/slices/mainPageSlice';
import styles from './ShoppingList.module.scss';
import { CreatePaymentDto } from 'app/types/api/apiTypes';
import createPayment from 'widgets/ShoppingList/utils/createPayment';

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

    const playerName = useSelector(selectPlayerName);
    const dispatch = useAppDispatch();

    const {
        productsToBuy,
        getProductsListPrice,
        addOrIncrementProductToList,
        decrementProductAmountInList,
        deleteProductFromList,
        promoCode,
        setPromoCode
    } = useContext(AppContext);
    const totalListPrice = getProductsListPrice();

    const handlePayment = () => {
        const paymentInfo: CreatePaymentDto = {
            playerName,
            productList: productsToBuy.map(({ id, amount }) => {
                return {
                    id,
                    amount
                };
            }),
            promocode: promoCode?.name ?? null
        };

        createPayment(paymentInfo);
    };

    const incrementProduct = (productId: string, name: string, displayedPrice: number) => () => {
        addOrIncrementProductToList(productId, name, displayedPrice);
    };

    const decrementProduct = (productId: string) => () => {
        decrementProductAmountInList(productId);
    };

    const deleteProduct = (productId: string) => () => {
        deleteProductFromList(productId);
    };

    const logout = () => {
        dispatch(erasePlayerInfo());
        setPromoCode(undefined);
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
                                            <div className={styles.rowWrapper}>
                                                <div className={classNames(styles.productRow, styles.roundedTop)}>
                                                    <div className={classNames(styles.cell, styles.name, styles.bold)}>
                                                        Товар:
                                                    </div>

                                                    <div
                                                        className={classNames(styles.cell, styles.amount, styles.bold)}
                                                    >
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
                                            </div>

                                            {productsToBuy.map((product, index) => {
                                                const { id: productId, name, amount, displayedPrice } = product;
                                                const isLastInList = index === productsToBuy.length - 1;

                                                return (
                                                    <div className={styles.rowWrapper}>
                                                        <div
                                                            className={classNames(styles.productRow, {
                                                                [styles.roundedBottom]: isLastInList
                                                            })}
                                                        >
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

                                                        <button
                                                            className={styles.deleteButton}
                                                            onClick={deleteProduct(productId)}
                                                        >
                                                            <img
                                                                src={trashIcon}
                                                                className={styles.trashIcon}
                                                                alt="Удалить"
                                                            />
                                                        </button>
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

                                    {playerName ? (
                                        <div className={styles.buyBlockWrapper}>
                                            <PromoCodeBlock />

                                            <div className={styles.playerNameLogoutWrapper}>
                                                <Button className={styles.button} onClick={handlePayment}>
                                                    Купить товары для игрока
                                                    <span className={styles.playerNameSpan}>{playerName}</span>
                                                </Button>

                                                <Button className={styles.logoutButton} onClick={logout}>
                                                    Выйти
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <PlayerInfoBlock
                                            className={styles.playerInfoBlock}
                                            title="Введите ник игрока, чтобы купить товары:"
                                        />
                                    )}
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
