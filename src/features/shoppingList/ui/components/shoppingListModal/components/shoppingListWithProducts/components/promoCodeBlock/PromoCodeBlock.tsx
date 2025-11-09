import { observer } from 'mobx-react-lite';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { cartStore } from '@/entities/cart';
import { fetchPromoCodeByName } from '@/entities/promocode';
import { DiscountType } from '@/shared/api/apiTypes';
import closeIcon from '@/shared/assets/closeIcon.svg';
import { useMediaContext } from '@/shared/lib/mediaContext';
import { BackgroundColor, Input, ModernButton } from '@/shared/ui';
import styles from './PromoCodeBlock.module.scss';

interface Props {
    disabled?: boolean;
}

export const PromoCodeBlock: FunctionComponent<Props> = observer(({ disabled: isDisabled }) => {
    const [isFormOpened, setIsFormOpened] = useState(false);
    const [formValue, setFormValue] = useState('');
    const [errorText, setErrorText] = useState<string | undefined>();
    const { isMobile } = useMediaContext();

    const { promoCode, setPromoCode } = cartStore;

    const openForm = () => setIsFormOpened(true);
    const closeForm = () => {
        setIsFormOpened(false);
        setFormValue('');
        setErrorText(undefined);
    };

    const erasePromoCode = () => {
        if (isDisabled) {
            return;
        }

        setPromoCode(undefined);
        setFormValue('');
        setIsFormOpened(true);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormValue(event.target.value);
    };

    const checkPromoCode = async () => {
        if (formValue.trim().length === 0) {
            setErrorText('Поле не должно быть пустым');
            return;
        }

        try {
            const promoCode = await fetchPromoCodeByName(formValue);
            setPromoCode(promoCode);
            setIsFormOpened(false);
            setErrorText(undefined);
        } catch (error) {
            setFormValue('');
            setErrorText('Недействительный промокод');
        }
    };

    if (promoCode) {
        return (
            <div className={styles.horizontalFormWrapper}>
                <span className={styles.activePromoCodeSpan}>
                    Активирован промокод {promoCode.name} (Скидка {promoCode.discount?.discountAmount ?? 0}{' '}
                    {promoCode.discount?.discountType === DiscountType.PERCENTAGE ? '%' : '₽'})
                </span>

                <img src={closeIcon} className={styles.closeIcon} alt="Закрыть форму" onClick={erasePromoCode} />
            </div>
        );
    }

    if (isFormOpened) {
        return (
            <div className={styles.verticalFormWrapper}>
                <div className={styles.horizontalFormWrapper}>
                    <Input
                        dark={!isMobile}
                        type="text"
                        value={formValue}
                        onChange={handleChange}
                        placeholder="Введите промокод"
                    />

                    <ModernButton
                        className={styles.modernButton}
                        background={BackgroundColor.GREEN}
                        onClick={checkPromoCode}
                        disabled={isDisabled}
                    >
                        ✓
                    </ModernButton>

                    <ModernButton className={styles.modernButton} background={BackgroundColor.RED} onClick={closeForm}>
                        <img src={closeIcon} className={styles.closeIcon} alt="Закрыть форму" onClick={closeForm} />
                    </ModernButton>
                </div>

                <span className={styles.errorSpan}>{errorText}</span>
            </div>
        );
    }

    return (
        <ModernButton
            className={styles.iHaveButton}
            background={BackgroundColor.ORANGE}
            onClick={openForm}
            disabled={isDisabled}
        >
            У меня есть промокод
        </ModernButton>
    );
});
