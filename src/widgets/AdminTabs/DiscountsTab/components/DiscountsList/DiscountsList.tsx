import React, { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './DiscountsList.module.scss';
import useDiscountsList from 'widgets/AdminTabs/DiscountsTab/hooks/useDiscountsList';
import RunnerLoader from 'shared/ui/RunnerLoader/RunnerLoader';
import Title from 'shared/ui/Title/Title';
import Table from 'shared/ui/Table/Table';
import { ActiveSubTab } from 'widgets/AdminTabs/DiscountsTab/DiscountsTab';
import Button from 'shared/ui/Button/Button';
import Spacing from 'shared/ui/spacing/Spacing';

interface Props {
    setActiveSubTab(subTab: ActiveSubTab): void;
    className?: string;
}

const DiscountsList: FunctionComponent<Props> = ({ setActiveSubTab, className }) => {
    const { discountsList, error, isLoading } = useDiscountsList();

    const handleCreateClick = () => setActiveSubTab(ActiveSubTab.CREATION);

    if (isLoading) {
        return <RunnerLoader />;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={classNames(styles.discountsList, [className])}>
            <Title>Список скидок:</Title>

            <Table
                columnNames={['ID', 'Название', 'Тип', 'Лимитировано', 'Начало', 'Конец', '% / руб.']}
                items={discountsList}
                renderProps={[
                    { fieldName: 'id' },
                    { fieldName: 'name' },
                    { fieldName: 'discountType' },
                    { fieldName: 'isDiscountLimited', render: (value: boolean) => <span>{value ? 'Да' : 'Нет'}</span> },
                    {
                        fieldName: 'startDate',
                        render: (value: string | null) => {
                            if (!value) {
                                return <span>-</span>;
                            }
                            return <>{new Date(value).toLocaleString()}</>;
                        }
                    },
                    {
                        fieldName: 'endDate',
                        render: (value: string | null) => {
                            if (!value) {
                                return <span>-</span>;
                            }
                            return <>{new Date(value).toLocaleString()}</>;
                        }
                    },
                    { fieldName: 'discountAmount' }
                ]}
            />

            <Spacing size={15} />

            <Button onClick={handleCreateClick}>Создать скидку</Button>
        </div>
    );
};

export default DiscountsList;
