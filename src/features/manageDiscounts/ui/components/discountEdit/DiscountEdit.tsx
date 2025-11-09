import { FunctionComponent } from 'react';
import { DiscountType } from '@/shared/api/apiTypes';
import { classNames } from '@/shared/lib/aliases';
import { AdminErrorBlock, Button, RunnerLoader, Spacing, Title } from '@/shared/ui';
import { useDiscountForm } from '../../../model/hooks/useDiscountForm';
import { ActiveSubTab, DiscountComponentProps } from '../../DiscountsTab';
import styles from './DiscountEdit.module.scss';

export const DiscountEdit: FunctionComponent<DiscountComponentProps> = ({
    editingDiscountId,
    setActiveSubTab,
    className
}) => {
    const navigateToDiscountsList = () => setActiveSubTab(ActiveSubTab.LIST);

    const {
        isLoading,
        loadingError,
        formValues,
        changeName,
        changeAmount,
        changeDiscountType,
        changeStartDate,
        changeEndDate,
        validateAndSend,
        isProcessing,
        error
    } = useDiscountForm({ productId: editingDiscountId, onFinish: navigateToDiscountsList });

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
                <Button onClick={validateAndSend} disabled={isProcessing}>
                    ОК
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
