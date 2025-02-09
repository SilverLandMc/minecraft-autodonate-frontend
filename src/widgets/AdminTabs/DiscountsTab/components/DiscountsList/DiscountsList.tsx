import { DiscountType } from 'app/types/api/apiTypes';
import { format } from 'date-fns';
import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import TimeFormatString from 'shared/const/enum/timeFormatString';
import classNames from 'shared/lib/aliases/classNames';
import AdminErrorBlock from 'shared/ui/adminErrorBlock/AdminErrorBlock';
import Button from 'shared/ui/button/Button';
import RunnerLoader from 'shared/ui/runnerLoader/RunnerLoader';
import Spacing from 'shared/ui/spacing/Spacing';
import Table from 'shared/ui/table/Table';
import Title from 'shared/ui/title/Title';
import deleteDiscount from 'widgets/AdminTabs/DiscountsTab/actions/deleteDiscount';
import { ActiveSubTab, DiscountComponentProps } from 'widgets/AdminTabs/DiscountsTab/DiscountsTab';
import useDiscountsList from 'widgets/AdminTabs/DiscountsTab/hooks/useDiscountsList';
import styles from './DiscountsList.module.scss';

const DiscountsList: FunctionComponent<DiscountComponentProps> = ({
    setActiveSubTab,
    className,
    setEditingDiscountId
}) => {
    const [reFetchListFlag, setReFetchListFlag] = useState(false);
    const [isOnlyActualMode, setIsOnlyActualMode] = useState(true);
    const { discountsList, error, isLoading } = useDiscountsList({ reFetchListFlag, isOnlyActualMode });

    const handleCreateClick = () => setActiveSubTab(ActiveSubTab.CREATION);

    const handleDelete = (id: string) => async () => {
        try {
            await deleteDiscount(id);
            setReFetchListFlag(!reFetchListFlag);
        } catch (error) {
            // todo Добавить нотификацию не в виде alert
            // eslint-disable-next-line no-alert
            alert('Ошибка при удалении скидки!');
        }
    };

    const handleEditClick = (id: string) => () => {
        setEditingDiscountId(id);
        setActiveSubTab(ActiveSubTab.EDITING);
    };

    const toggleOnlyActual = (event: ChangeEvent<HTMLInputElement>) => setIsOnlyActualMode(event.target.checked);

    if (isLoading) {
        return <RunnerLoader />;
    }

    if (error) {
        return <AdminErrorBlock text="Ошибка при получении списка скидок" />;
    }

    const discountsTable = (
        <Table
            className={styles.table}
            columnNames={['ID', 'Создан', 'Название', 'Период', '% / руб.', 'Действия']}
            items={discountsList}
            renderProps={[
                {
                    firstFieldName: 'id',
                    render: (id: string) => <span className={styles.id}>{id.slice(0, 4)}..</span>
                },
                {
                    firstFieldName: 'createdDate',
                    render: (createdDate: string | null) => format(createdDate, TimeFormatString.DD_MM_YY_HH_MM)
                },
                { firstFieldName: 'name' },
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
                    firstFieldName: 'discountAmount',
                    secondFieldName: 'discountType',
                    render: (amount: string, type: DiscountType) =>
                        amount ? `${amount} ${type === DiscountType.PERCENTAGE ? '%' : '₽'}` : '-'
                },
                {
                    firstFieldName: 'id',
                    secondFieldName: 'deleted',
                    render: (id: string, isDeleted: boolean) =>
                        isDeleted ? (
                            'Удалена'
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
        <div className={classNames(styles.discountsList, [className])}>
            <Title>Список скидок:</Title>

            <div className={styles.checkboxContainer}>
                Показывать только не удалённые:
                <input type="checkbox" checked={isOnlyActualMode} onChange={toggleOnlyActual} />
            </div>

            {discountsList.length > 0 ? discountsTable : <div className={styles.error}>Список скидок пуст!</div>}

            <Spacing size={15} />

            <Button onClick={handleCreateClick}>Создать скидку</Button>

            <Spacing size={15} />
        </div>
    );
};

export default DiscountsList;
