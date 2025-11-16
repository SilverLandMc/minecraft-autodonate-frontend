import { reatomComponent, useAction, useAtom } from '@reatom/npm-react';
import { FunctionComponent, useState } from 'react';
import { UserAuthBlock } from '@/features/userAuthBlock';
import { cartStore, createPaymentLink } from '@/entities/cart';
import { userStoreAtom } from '@/entities/user';
import { CreatePaymentDto } from '@/shared/api/apiTypes';
import { createLinkOpener } from '@/shared/lib/createLinkOpener';
import { BackgroundColor, ModernButton, Optional } from '@/shared/ui';
import { PromoCodeBlock } from './components/promoCodeBlock/PromoCodeBlock';
import { ShoppingListTable } from './components/shoppingListTable/ShoppingListTable';
import styles from './ShoppingListWithProducts.module.scss';

export const ShoppingListWithProducts: FunctionComponent = reatomComponent(() => {
    const [isPaymentCreating, setIsPaymentCreating] = useState(false);
    const [paymentError, setPaymentError] = useState<string>();

    const [userName] = useAtom(userStoreAtom.userName);

    const [productAmountById] = useAtom(cartStore.productAmountById);
    const [promoCode] = useAtom(cartStore.promoCode);

    const handleDeletePromoCode = useAction(cartStore.deletePromoCode);
    const handleEraseUserInfo = useAction(userStoreAtom.eraseUserInfo);

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
            promocode: promoCode?.id
        };

        try {
            setIsPaymentCreating(true);
            const paymentLink = await createPaymentLink(paymentInfo);
            createLinkOpener(paymentLink);
            setPaymentError(undefined);
        } catch {
            setPaymentError('Что-то пошло не так. Попробуйте перезагрузить страницу');
        } finally {
            setIsPaymentCreating(false);
        }
    };

    const logout = () => {
        handleEraseUserInfo();
        handleDeletePromoCode();
    };

    return (
        <>
            <h2 className={styles.header}>Корзина</h2>

            {userName ? (
                <div className={styles.buyBlockWrapper}>
                    <div className={styles.playerNameLogoutWrapper}>
                        <div>
                            Пользователь <span className={styles.playerNameSpan}>{userName}</span>
                        </div>

                        <span className={styles.logoutButton} onClick={logout}>
                            Выйти
                        </span>
                    </div>

                    {Boolean(paymentError) && <span className={styles.errorSpan}>{paymentError}</span>}
                </div>
            ) : (
                <UserAuthBlock usedInCart />
            )}

            <ShoppingListTable />

            <Optional visible={Boolean(userName)}>
                <div className={styles.buttonBlock}>
                    <PromoCodeBlock disabled={isPaymentCreating} />

                    <ModernButton
                        background={BackgroundColor.RED}
                        className={styles.buyButton}
                        onClick={handlePayment}
                        disabled={isPaymentCreating}
                    >
                        Оплатить
                    </ModernButton>
                </div>
            </Optional>
        </>
    );
});
