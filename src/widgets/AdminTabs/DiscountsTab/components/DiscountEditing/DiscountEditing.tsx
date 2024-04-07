import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import { ActiveSubTab, DiscountComponentProps } from 'widgets/AdminTabs/DiscountsTab/DiscountsTab';
import useDiscount from 'widgets/AdminTabs/DiscountsTab/hooks/useDiscount';
import RunnerLoader from 'shared/ui/RunnerLoader/RunnerLoader';
import { DiscountInDto, DiscountType } from 'app/types/api/apiTypes';
import Title from 'shared/ui/Title/Title';
import Spacing from 'shared/ui/spacing/Spacing';
import Button from 'shared/ui/Button/Button';
import editDiscount from 'widgets/AdminTabs/DiscountsTab/actions/editDiscount';
import convertTimestampToInputString from 'shared/lib/format/convertTimestampToInputString';
import styles from './DiscountEditing.module.scss';
import AdminErrorBlock from 'shared/ui/AdminErrorBlock/AdminErrorBlock';

const initialFormValue: DiscountInDto = {
    name: '',
    id: '',
    endDate: '',
    discountType: DiscountType.PERCENTAGE,
    startDate: '',
    discountAmount: 0
};

const DiscountEditing: FunctionComponent<DiscountComponentProps> = ({
    editingDiscountId,
    setActiveSubTab,
    className
}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [formValues, setFormValues] = useState<DiscountInDto>(initialFormValue);
    const { discount: initialDiscount, isLoading, error: loadingError } = useDiscount(editingDiscountId);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        setFormValues({
            ...initialDiscount,
            startDate: convertTimestampToInputString(initialDiscount.startDate),
            endDate: convertTimestampToInputString(initialDiscount.endDate)
        });
    }, [isLoading]);

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

    const validateAndEditDiscount = async () => {
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
            await editDiscount({
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

    if (isLoading) {
        return <RunnerLoader />;
    }

    if (loadingError) {
        return <AdminErrorBlock text="Ошибка при загрузке скидки. Попробуйте обновить страницу" />;
    }

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
                <Button onClick={validateAndEditDiscount} disabled={isProcessing}>
                    Редактировать
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

export default DiscountEditing;
