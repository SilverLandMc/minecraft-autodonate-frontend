import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './DiscountsList.module.scss';
import useDiscountsList from 'widgets/AdminTabs/DiscountsTab/hooks/useDiscountsList';
import RunnerLoader from 'shared/ui/RunnerLoader/RunnerLoader';
import Title from 'shared/ui/Title/Title';
import Table from 'shared/ui/Table/Table';
import { ActiveSubTab, DiscountComponentProps } from 'widgets/AdminTabs/DiscountsTab/DiscountsTab';
import Button from 'shared/ui/Button/Button';
import Spacing from 'shared/ui/spacing/Spacing';
import deleteDiscount from 'widgets/AdminTabs/DiscountsTab/actions/deleteDiscount';
import { DiscountType } from 'app/types/api/apiTypes';
import dateOption from 'shared/const/dateOption';

const DiscountsList: FunctionComponent<DiscountComponentProps> = ({
    setActiveSubTab,
    className,
    setEditingDiscountId
}) => {
    const [reFetchListFlag, setReFetchListFlag] = useState(false);
    const [isOnlyActualMode, setIsOnlyActualMode] = useState(true);
    const { discountsList, error, isLoading } = useDiscountsList(reFetchListFlag, isOnlyActualMode);

    const handleCreateClick = () => setActiveSubTab(ActiveSubTab.CREATION);

    const handleDelete = (id: string) => async () => {
        try {
            await deleteDiscount(id);
            setReFetchListFlag(!reFetchListFlag);
        } catch (error) {
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
        return <div className={styles.error}>Ошибка при получении списка скидок</div>;
    }

    const table = (
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
                    render: (value: string | null) =>
                        value ? new Date(value).toLocaleString('ru-RU', dateOption['DD_MM_YY_HH_MM']) : '-'
                },
                { firstFieldName: 'name' },
                {
                    firstFieldName: 'startDate',
                    secondFieldName: 'endDate',
                    render: (startDate: string | null, endDate: string | null) => (
                        <>
                            {startDate ? (
                                <>{new Date(startDate).toLocaleString('ru-RU', dateOption['DD_MM_YY_HH_MM'])}</>
                            ) : (
                                '-'
                            )}

                            {' - '}

                            {endDate ? (
                                <>{new Date(endDate).toLocaleString('ru-RU', dateOption['DD_MM_YY_HH_MM'])}</>
                            ) : (
                                '-'
                            )}
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
                                <div className={styles.actionIcon} onClick={handleDelete(id)}>
                                    🗑️
                                </div>

                                <div className={styles.actionIcon} onClick={handleEditClick(id)}>
                                    ✏️
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

            {discountsList.length > 0 ? table : <div className={styles.error}>Список скидок пуст!</div>}

            <Spacing size={15} />

            <Button onClick={handleCreateClick}>Создать скидку</Button>

            <Spacing size={15} />
        </div>
    );
};

export default DiscountsList;
