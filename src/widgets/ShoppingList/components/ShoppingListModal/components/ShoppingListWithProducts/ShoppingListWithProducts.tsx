import { AppContext } from 'app/providers/AppContextProvider';
import { CreatePaymentDto } from 'app/types/api/apiTypes';
import { useUserInfo, useUserStoreActions } from 'entities/user';
import PlayerInfoBlock from 'features/playerInfoBlock/PlayerInfoBlock';
import { FunctionComponent, useContext, useState } from 'react';
import createLinkOpener from 'shared/lib/createLinkOpener/createLinkOpener';
import Button from 'shared/ui/button/Button';
import PromoCodeBlock from 'widgets/ShoppingList/components/ShoppingListModal/components/ShoppingListWithProducts/components/PromoCodeBlock/PromoCodeBlock';
import ShoppingListTable from 'widgets/ShoppingList/components/ShoppingListModal/components/ShoppingListWithProducts/components/ShoppingListTable/ShoppingListTable';
import createPaymentLink from 'widgets/ShoppingList/utils/createPaymentLink';
import styles from './ShoppingListWithProducts.module.scss';

const ShoppingListWithProducts: FunctionComponent = () => {
    const [isPaymentCreating, setIsPaymentCreating] = useState(false);
    const [paymentError, setPaymentError] = useState<string>();

    const { userName } = useUserInfo();
    const { eraseUserInfo } = useUserStoreActions();

    const { productsToBuy, promoCode, setPromoCode } = useContext(AppContext) ?? {};

    const handlePayment = async () => {
        if (!userName || productsToBuy?.length === 0) {
            return;
        }

        const paymentInfo: CreatePaymentDto = {
            playerName: userName,
            productList: productsToBuy?.map(({ id, amount }) => ({
                id,
                amount
            })),
            promocode: promoCode?.name ?? null
        };

        try {
            setIsPaymentCreating(true);
            const paymentLink = await createPaymentLink(paymentInfo);
            createLinkOpener(paymentLink);
            setPaymentError(undefined);
        } catch (error) {
            setPaymentError('Что-то пошло не так. Попробуйте перезагрузить страницу');
        } finally {
            setIsPaymentCreating(false);
        }
    };

    const logout = () => {
        eraseUserInfo();
        setPromoCode?.(undefined);
    };

    return (
        <>
            <h2 className={styles.header}>Ваша корзина:</h2>

            <ShoppingListTable />

            {userName ? (
                <div className={styles.buyBlockWrapper}>
                    <PromoCodeBlock disabled={isPaymentCreating} />

                    <div className={styles.playerNameLogoutWrapper}>
                        <Button className={styles.button} onClick={handlePayment} disabled={isPaymentCreating}>
                            Купить для
                            <span className={styles.playerNameSpan}>{userName}</span>
                        </Button>

                        <Button className={styles.logoutButton} onClick={logout} disabled={isPaymentCreating}>
                            Выйти
                        </Button>
                    </div>

                    {Boolean(paymentError) && <span className={styles.errorSpan}>{paymentError}</span>}
                </div>
            ) : (
                <PlayerInfoBlock className={styles.playerInfoBlock} title="Введите ник игрока, чтобы купить товары:" />
            )}
        </>
    );
};

export default ShoppingListWithProducts;
