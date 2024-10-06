import { DiscountBaseInDto, DiscountType } from 'app/types/api/apiTypes';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import Button from 'shared/ui/Button/Button';
import Spacing from 'shared/ui/spacing/Spacing';
import Title from 'shared/ui/Title/Title';
import createDiscount from 'widgets/AdminTabs/DiscountsTab/components/DiscountCreation/utils/createDiscount';
import { ActiveSubTab, DiscountComponentProps } from 'widgets/AdminTabs/DiscountsTab/DiscountsTab';
import styles from './DiscountCreation.module.scss';

const initialFormValues: DiscountBaseInDto = {
    name: '',
    discountType: DiscountType.PERCENTAGE,
    startDate: '',
    endDate: '',
    discountAmount: 0
};

const DiscountCreation: FunctionComponent<DiscountComponentProps> = ({ setActiveSubTab, className }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [formValues, setFormValues] = useState<DiscountBaseInDto>(initialFormValues);

    const changeName = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, name: event.target.value });

    const changeDiscountType = (event: ChangeEvent<HTMLSelectElement>) =>
        setFormValues({ ...formValues, discountType: event.target.value as DiscountType, discountAmount: 0 });

    const changeStartDate = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, startDate: event.target.value });

    const changeEndDate = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, endDate: event.target.value });

    const changeAmount = (event: ChangeEvent<HTMLInputElement>) => {
        const nextAmount = Number(event.target.value);
        if (formValues.discountType === DiscountType.PERCENTAGE && nextAmount > 100) {
            return;
        }

        setFormValues({ ...formValues, discountAmount: nextAmount });
    };

    const navigateToDiscountsList = () => setActiveSubTab(ActiveSubTab.LIST);

    const validateAndCreateDiscount = async () => {
        if (formValues.name.trim().length === 0) {
            setError('Название не должно быть пустым!');
            return;
        }

        if (formValues.discountAmount <= 0) {
            setError('Размер скидки не должен быть равен нулю!');
            return;
        }

        try {
            setIsProcessing(true);
            await createDiscount({
                ...formValues,
                startDate: formValues.startDate ? new Date(formValues.startDate).toISOString() : null,
                endDate: formValues.endDate ? new Date(formValues.endDate).toISOString() : null
            });
            navigateToDiscountsList();
        } catch (error) {
            setError('Ошибка при попытке создания скидки');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className={classNames(styles.discountCreation, [className])}>
            <Title>Название:</Title>
            <input type="text" value={formValues.name} onChange={changeName} />

            <Title>Тип скидки:</Title>
            <select value={formValues.discountType} onChange={changeDiscountType}>
                <option value={DiscountType.PERCENTAGE}>Процентная</option>
                <option value={DiscountType.AMOUNT}>Фиксированная</option>
            </select>

            <Title>Размер:</Title>
            <input
                type="number"
                value={formValues.discountAmount}
                onChange={changeAmount}
                min={0}
                max={formValues.discountType === DiscountType.PERCENTAGE ? 100 : undefined}
            />

            <Title>Начало:</Title>
            <input type="datetime-local" value={formValues.startDate} onChange={changeStartDate} />

            <Title>Конец:</Title>
            <input type="datetime-local" value={formValues.endDate} onChange={changeEndDate} />

            <Spacing size={20} />

            <div className={styles.buttonsRowWrapper}>
                <Button onClick={validateAndCreateDiscount} disabled={isProcessing}>
                    Создать
                </Button>

                <Button className={styles.navigateBackButton} onClick={navigateToDiscountsList} disabled={isProcessing}>
                    К списку скидок
                </Button>
            </div>

            <Spacing size={20} />

            {error && (
                <>
                    <div className={styles.error}>{error}</div>
                    <Spacing size={20} />
                </>
            )}
        </div>
    );
};

export default DiscountCreation;
