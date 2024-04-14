import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './PromoCodesList.module.scss';
import usePromoCodesList from 'widgets/AdminTabs/PromoCodesTab/hooks/usePromoCodesList';
import AdminErrorBlock from 'shared/ui/AdminErrorBlock/AdminErrorBlock';
import RunnerLoader from 'shared/ui/RunnerLoader/RunnerLoader';
import Title from 'shared/ui/Title/Title';
import Table from 'shared/ui/Table/Table';
import { format } from 'date-fns';
import TimeFormatString from 'shared/const/enum/timeFormatString';
import { DiscountType } from 'app/types/api/apiTypes';
import deletePromoCode from 'widgets/AdminTabs/PromoCodesTab/actions/deletePromoCode';
import { PromoCodeComponentProps } from 'widgets/AdminTabs/PromoCodesTab/PromoCodesTab';
import { ActiveSubTab } from 'widgets/AdminTabs/DiscountsTab/DiscountsTab';
import Spacing from 'shared/ui/spacing/Spacing';
import Button from 'shared/ui/Button/Button';

const PromoCodesList: FunctionComponent<PromoCodeComponentProps> = ({
    setActiveSubTab,
    setEditingPromoCodeId,
    className
}) => {
    const [isOnlyActualMode, setIsOnlyActualMode] = useState(true);
    const [reFetchFlag, setReFetchFlag] = useState(false);
    const { promoCodesList, isLoading, error } = usePromoCodesList({ isOnlyActualMode, reFetchFlag });

    const toggleOnlyActual = (event: ChangeEvent<HTMLInputElement>) => setIsOnlyActualMode(event.target.checked);

    const handleEditClick = (id: string) => () => {
        setEditingPromoCodeId(id);
        setActiveSubTab(ActiveSubTab.EDITING);
    };

    const handleCreateClick = () => {
        setActiveSubTab(ActiveSubTab.CREATION);
    };

    const handleDelete = (id: string) => async () => {
        try {
            await deletePromoCode(id);
            setReFetchFlag(!reFetchFlag);
        } catch (error) {
            alert('Ошибка при удалении промокода!');
        }
    };

    if (isLoading) {
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

export default PromoCodesList;
