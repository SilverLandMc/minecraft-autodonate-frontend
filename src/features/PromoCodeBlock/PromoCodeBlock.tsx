import { ChangeEvent, FunctionComponent, useContext, useState } from 'react';
import closeIcon from 'shared/assets/closeIcon.svg';
import { AppContext } from 'app/providers/AppContextProvider';
import styles from './PromoCodeBlock.module.scss';
import fetchPromoCodeByName from 'features/PromoCodeBlock/utils/fetchPromoCodeByName';

interface Props {
    disabled?: boolean;
}

const PromoCodeBlock: FunctionComponent<Props> = ({ disabled }) => {
    const [isFormOpened, setIsFormOpened] = useState(false);
    const [formValue, setFormValue] = useState('');
    const [errorText, setErrorText] = useState<string | undefined>();

    const { promoCode, setPromoCode } = useContext(AppContext);

    const openForm = () => setIsFormOpened(true);
    const closeForm = () => {
        setIsFormOpened(false);
        setFormValue('');
        setErrorText(undefined);
    };

    const erasePromoCode = () => {
        if (disabled) {
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
                    Активирован промокод {promoCode.name} (Скидка {promoCode.discount.name})
                </span>

                <img src={closeIcon} className={styles.closeIcon} alt="Закрыть форму" onClick={erasePromoCode} />
            </div>
        );
    }

    if (isFormOpened) {
        return (
            <div className={styles.verticalFormWrapper}>
                <div className={styles.horizontalFormWrapper}>
                    <input
                        className={styles.input}
                        type="text"
                        value={formValue}
                        onChange={handleChange}
                        placeholder="Введите промокод"
                    />

                    <button className={styles.sendButton} onClick={checkPromoCode} disabled={disabled}>
                        ✓
                    </button>

                    <img src={closeIcon} className={styles.closeIcon} alt="Закрыть форму" onClick={closeForm} />
                </div>

                <span className={styles.errorSpan}>{errorText}</span>
            </div>
        );
    }

    return (
        <button className={styles.button} onClick={openForm} disabled={disabled}>
            У меня есть промокод
        </button>
    );
};

export default PromoCodeBlock;
