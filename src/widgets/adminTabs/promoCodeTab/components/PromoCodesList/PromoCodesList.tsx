import { format } from 'date-fns';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { ActiveSubTab } from 'widgets/adminTabs/discountTab/DiscountsTab';
import deletePromoCode from 'widgets/adminTabs/promoCodeTab/actions/deletePromoCode';
import usePromoCodesList from 'widgets/adminTabs/promoCodeTab/hooks/usePromoCodesList';
import { PromoCodeComponentProps } from 'widgets/adminTabs/promoCodeTab/PromoCodesTab';
import { DiscountType } from '@/shared/api/apiTypes';
import TimeFormatString from '@/shared/const/enum/timeFormatString';
import classNames from '@/shared/lib/aliases/classNames';
import { Spacing } from '@/shared/ui';
import AdminErrorBlock from '@/shared/ui/adminErrorBlock/AdminErrorBlock';
import Button from '@/shared/ui/button/Button';
import RunnerLoader from '@/shared/ui/runnerLoader/RunnerLoader';
import Table from '@/shared/ui/table/Table';
import Title from '@/shared/ui/title/Title';
import styles from './PromoCodesList.module.scss';

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
            // todo Переехать на нотификации
            // eslint-disable-next-line no-alert
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
