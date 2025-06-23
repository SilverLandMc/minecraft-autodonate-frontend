import { cartStore } from 'entities/cart';
import { observer } from 'mobx-react-lite';
import { FunctionComponent, useState } from 'react';
import { CreatePaymentDto } from '@/app/types/api/apiTypes';
import PromoCodeBlock from '@/widgets/shoppingList/components/shoppingListModal/components/ShoppingListWithProducts/components/PromoCodeBlock/PromoCodeBlock';
import ShoppingListTable from '@/widgets/shoppingList/components/shoppingListModal/components/ShoppingListWithProducts/components/ShoppingListTable/ShoppingListTable';
import createPaymentLink from '@/widgets/shoppingList/utils/createPaymentLink';
import { UserAuthBlock, useUserInfo, useUserStoreActions } from '@/entities/user';
import createLinkOpener from '@/shared/lib/createLinkOpener/createLinkOpener';
import Button from '@/shared/ui/button/Button';
import styles from './ShoppingListWithProducts.module.scss';

const ShoppingListWithProducts: FunctionComponent = observer(() => {
    const [isPaymentCreating, setIsPaymentCreating] = useState(false);
    const [paymentError, setPaymentError] = useState<string>();

    const { userName } = useUserInfo();
    const { eraseUserInfo } = useUserStoreActions();

    const { productAmountById, promoCode, deletePromoCode } = cartStore;

    const handlePayment = async () => {
        if (!userName || Object.keys(productAmountById).length === 0) {
            return;
        }

        const paymentInfo: CreatePaymentDto = {
            playerName: userName,
            productList:
                Object.entries(productAmountById).map(([id, amount]) => ({
                    id,
                    amount
                })) ?? [],
            promocode: promoCode?.name
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
        deletePromoCode();
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
                <UserAuthBlock />
            )}
        </>
    );
});

export default ShoppingListWithProducts;
