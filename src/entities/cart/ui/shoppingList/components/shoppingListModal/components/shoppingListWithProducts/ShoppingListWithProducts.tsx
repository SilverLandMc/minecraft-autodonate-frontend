import { observer } from 'mobx-react-lite';
import { FunctionComponent, useState } from 'react';
import { CreatePaymentDto } from '@/app/types/api/apiTypes';
import { ProductsById } from '@/app/types/api/apiTypesHelper';
import { UserAuthBlock, useUserInfo, useUserStoreActions } from '@/entities/user';
import createLinkOpener from '@/shared/lib/createLinkOpener/createLinkOpener';
import { BackgroundColor, ModernButton, Optional } from '@/shared/ui';
import { cartStore } from '../../../../../../model/store';
import createPaymentLink from '../../../../utils/createPaymentLink';
import { PromoCodeBlock } from './components/PromoCodeBlock/PromoCodeBlock';
import { ShoppingListTable } from './components/ShoppingListTable/ShoppingListTable';
import styles from './ShoppingListWithProducts.module.scss';

interface Props {
    productsById: ProductsById;
}

export const ShoppingListWithProducts: FunctionComponent<Props> = observer(({ productsById }) => {
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
        eraseUserInfo();
        deletePromoCode();
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

            <ShoppingListTable productsById={productsById} />

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
