import React, { FunctionComponent, MouseEvent, useContext, useRef, useState } from 'react';
import ModalBackground from 'shared/ui/ModalBackground/ModalBackground';
import ShoppingListTable from 'features/ShoppingListTable/ShoppingListTable';
import PromoCodeBlock from 'features/PromoCodeBlock/PromoCodeBlock';
import Button from 'shared/ui/Button/Button';
import PlayerInfoBlock from 'features/playerInfoBlock/PlayerInfoBlock';
import chestImage from 'shared/assets/chest.png';
import Portal from 'shared/ui/Portal/Portal';
import { useClickAway } from 'react-use';
import { useSelector } from 'react-redux';
import selectPlayerName from 'shared/redux/selectors/selectPlayerName';
import useAppDispatch from 'shared/hooks/redux/useAppDispatch';
import { AppContext } from 'app/providers/AppContextProvider';
import { CreatePaymentDto } from 'app/types/api/apiTypes';
import createPayment from 'widgets/ShoppingList/utils/createPayment';
import { erasePlayerInfo } from 'pages/MainPage/slices/mainPageSlice';
import styles from './ShoppingListModal.module.scss';

interface Props {
    isModalOpened: boolean;
    isClosing: boolean;
    onClose(event: MouseEvent): void;
}

const ShoppingListModal: FunctionComponent<Props> = ({ isModalOpened, isClosing, onClose }) => {
    const [isPaymentCreating, setIsPaymentCreating] = useState(false);
    const [paymentError, setPaymentError] = useState('');

    const playerName = useSelector(selectPlayerName);
    const dispatch = useAppDispatch();

    const { productsToBuy, promoCode, setPromoCode } = useContext(AppContext);

    const handlePayment = async () => {
        if (!playerName || !productsToBuy || productsToBuy.length === 0) {
            return;
        }

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

        try {
            setIsPaymentCreating(true);
            await createPayment(paymentInfo);
            setIsPaymentCreating(false);
        } catch (error) {
            setPaymentError('Что-то пошло не так. Попробуйте перезагрузить страницу');
        }
    };

    const logout = () => {
        dispatch(erasePlayerInfo());
        setPromoCode(undefined);
    };

    const wrapperRef = useRef<HTMLDivElement>(null);
    useClickAway(wrapperRef, (event) => onClose(event as unknown as MouseEvent));

    if (!isModalOpened) {
        return null;
    }

    return (
        <Portal>
            <ModalBackground closing={isClosing} fullScreenAtMobile>
                <div ref={wrapperRef} className={styles.modalWrapper}>
                    {productsToBuy.length > 0 ? (
                        <>
                            <h2 className={styles.header}>Ваша корзина:</h2>

                            <ShoppingListTable />

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

                            <Button className={styles.button} onClick={onClose}>
                                Вернуться в магазин
                            </Button>
                        </>
                    )}
                </div>
            </ModalBackground>
        </Portal>
    );
};

export default ShoppingListModal;
