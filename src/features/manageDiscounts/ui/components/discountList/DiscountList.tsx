import { format } from 'date-fns';
import { FunctionComponent } from 'react';
import { DiscountType } from '@/shared/api/apiTypes';
import { TimeFormatString } from '@/shared/const/enum/timeFormatString';
import { classNames } from '@/shared/lib/aliases';
import { AdminErrorBlock, Button, RunnerLoader, Spacing, Table, Title } from '@/shared/ui';
import { useList } from '../../../model/hooks/useList';
import { DiscountComponentProps } from '../../DiscountsTab';
import styles from './DiscountList.module.scss';

export const DiscountList: FunctionComponent<DiscountComponentProps> = ({
    setActiveSubTab,
    className,
    setEditingDiscountId
}) => {
    const {
        discountsList,
        error,
        isLoading,
        handleCreateClick,
        handleDelete,
        handleEditClick,
        toggleOnlyActual,
        isOnlyActualMode
    } = useList({ setActiveSubTab, setEditingDiscountId });

    if (isLoading || !discountsList) {
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
                    render: (createdDate: string | null) => {
                        if (!createdDate) {
                            return '-';
                        }

                        return format(createdDate, TimeFormatString.DD_MM_YY_HH_MM);
                    }
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
