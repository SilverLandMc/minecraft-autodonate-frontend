import { format } from 'date-fns';
import { FunctionComponent } from 'react';
import { DiscountType } from '@/shared/api/apiTypes';
import { TimeFormatString } from '@/shared/enums/timeFormatString';
import { classNames } from '@/shared/lib/aliases';
import { AdminErrorBlock, Button, RunnerLoader, Spacing, Table, Title } from '@/shared/ui';
import { useList } from '../../../model/hooks/useList';
import { PromoCodeComponentProps } from '../../PromoCodesTab';
import styles from './PromoCodeList.module.scss';

export const PromoCodeList: FunctionComponent<PromoCodeComponentProps> = ({
    setActiveSubTab,
    setEditingPromoCodeId,
    className
}) => {
    const {
        isLoading,
        promoCodesList,
        error,
        handleEditClick,
        handleDelete,
        isOnlyActualMode,
        toggleOnlyActual,
        handleCreateClick
    } = useList({ setActiveSubTab, setEditingPromoCodeId });

    if (isLoading || !promoCodesList) {
        return <RunnerLoader />;
    }

    if (error) {
        return <AdminErrorBlock text="Ошибка при загрузке списка промокодов" />;
    }

    const promoCodesTable = (
        <Table
            columnNames={['Название', 'Использован', 'Период', 'Скидка', '% / ₽', 'Лимитирован', 'Действия']}
            items={promoCodesList}
            renderProps={[
                { firstFieldName: 'name' },

                {
                    firstFieldName: 'currentUseCount',
                    secondFieldName: 'maxUseCount',
                    render: (currentUseCount: number, maxUseCount: number) => `${currentUseCount} / ${maxUseCount}`
                },

                {
                    firstFieldName: 'startDate',
                    secondFieldName: 'endDate',
                    render: (startDate: string | null, endDate: string | null) => (
                        <>
                            {startDate ? <>{format(startDate, TimeFormatString.DD_MM_YY_HH_MM)}</> : '-'}

                            {' - '}

                            {endDate ? <>{format(endDate, TimeFormatString.DD_MM_YY_HH_MM)}</> : '-'}
                        </>
                    )
                },

                {
                    firstFieldName: ['discount', 'name'],
                    secondFieldName: ['discount', 'deleted'],
                    render: (name: number, isDeleted: boolean) => (
                        <span className={classNames(styles.discountName, { [styles.isDeleted]: isDeleted })}>
                            {name}
                        </span>
                    )
                },

                {
                    firstFieldName: ['discount', 'discountAmount'],
                    secondFieldName: ['discount', 'discountType'],
                    render: (amount: string, type: DiscountType) =>
                        amount ? `${amount} ${type === DiscountType.PERCENTAGE ? '%' : '₽'}` : '-'
                },

                { firstFieldName: 'limitedUse', render: (isLimited: boolean) => (isLimited ? 'Да' : 'Нет') },

                {
                    firstFieldName: 'id',
                    secondFieldName: 'deleted',
                    render: (id: string, isDeleted: boolean) =>
                        isDeleted ? (
                            'Удалён'
                        ) : (
                            <div className={styles.actionsWrapper}>
                                <div className={styles.actionIcon} onClick={handleEditClick(id)}>
                                    ✏️
                                </div>

                                <div className={styles.actionIcon} onClick={handleDelete(id)}>
                                    🗑️
                                </div>
                            </div>
                        )
                }
            ]}
        />
    );

    return (
        <div className={classNames(styles.promoCodesList, [className])}>
            <Title>Список промокодов:</Title>

            <div className={styles.checkboxContainer}>
                Показывать только не удалённые:
                <input type="checkbox" checked={isOnlyActualMode} onChange={toggleOnlyActual} />
            </div>

            {promoCodesList.length > 0 ? promoCodesTable : 'Список промокодов пуст'}

            <Spacing size={15} />

            <Button onClick={handleCreateClick}>Создать промокод</Button>

            <Spacing size={15} />
        </div>
    );
};
