import { FunctionComponent } from 'react';
import { classNames } from '@/shared/lib/aliases';
import { AdminErrorBlock, Button, RunnerLoader, Spacing, Title } from '@/shared/ui';
import { usePromocodeForm } from '../../../model/hooks/usePromocodeForm';
import { ActiveSubTab, PromoCodeComponentProps } from '../../PromoCodesTab';
import styles from './PromoCodeEdit.module.scss';

export const PromocodeEdit: FunctionComponent<PromoCodeComponentProps> = ({
    setActiveSubTab,
    editingPromoCodeId,
    className
}) => {
    const navigateToList = () => setActiveSubTab(ActiveSubTab.LIST);

    const {
        isDiscountInfoLoading,
        isLoading,
        discountInfo,
        loadingError,
        discountInfoError,
        formValues,
        changeName,
        changeMaxUseCount,
        changeIsLimited,
        changeStartDate,
        changeEndDate,
        changeDiscountId,
        validateAndSend,
        isProcessing,
        error
    } = usePromocodeForm({ promocodeId: editingPromoCodeId, onFinish: navigateToList });

    if (isDiscountInfoLoading || isLoading || !discountInfo) {
        return <RunnerLoader />;
    }

    if (loadingError) {
        return <AdminErrorBlock text="Ошибка при загрузке промокода. Попробуйте обновить страницу" />;
    }

    if (discountInfoError) {
        return <AdminErrorBlock text="Ошибка при загрузке данных о скидках. Попробуйте обновить страницу" />;
    }

    return (
        <div className={classNames(styles.discountCreation, [className])}>
            <Title>Название:</Title>
            <input type="text" value={formValues.name} disabled onChange={changeName} />

            <Title>Скидка:</Title>
            <select value={formValues.discountId} onChange={changeDiscountId}>
                {discountInfo.map(({ id, description }) => (
                    <option key={id} value={id}>
                        {description}
                    </option>
                ))}
            </select>

            <Title>Максимальное число использований:</Title>
            <input type="number" value={formValues.maxUseCount} onChange={changeMaxUseCount} min={0} />

            <Title>Лимитирован:</Title>
            <input type="checkbox" checked={formValues.isLimitedUse} onChange={changeIsLimited} />

            <Title>Начало:</Title>
            <input type="datetime-local" value={formValues.startDate} onChange={changeStartDate} />

            <Title>Конец:</Title>
            <input type="datetime-local" value={formValues.endDate} onChange={changeEndDate} />

            <Spacing size={20} />

            <div className={styles.buttonsRowWrapper}>
                <Button onClick={validateAndSend} disabled={isProcessing}>
                    Редактировать
                </Button>

                <Button className={styles.navigateBackButton} onClick={navigateToList} disabled={isProcessing}>
                    К списку промокодов
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
