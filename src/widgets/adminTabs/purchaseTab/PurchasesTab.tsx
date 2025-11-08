import { FunctionComponent } from 'react';
import LatestPurchases from '@/widgets/adminTabs/purchaseTab/components/LatestPurchases/LatestPurchases';
import usePurchasesInfo from '@/widgets/adminTabs/purchaseTab/hooks/usePurchasesInfo';
import classNames from '@/shared/lib/aliases/classNames';
import { Spacing } from '@/shared/ui';
import AdminErrorBlock from '@/shared/ui/adminErrorBlock/AdminErrorBlock';
import RunnerLoader from '@/shared/ui/runnerLoader/RunnerLoader';
import Title from '@/shared/ui/title/Title';
import styles from './PurchasesTab.module.scss';

export const PurchasesTab: FunctionComponent = () => {
    const { purchaseInfo, isLoading, error } = usePurchasesInfo();

    if (isLoading) {
        return <RunnerLoader />;
    }

    if (error || !purchaseInfo) {
        return <AdminErrorBlock text="Ошибка при загрузке числа покупок / топа покупок" />;
    }

    const { totalPurchases, topPurchases } = purchaseInfo;

    return (
        <div className={styles.tab}>
            <Title>Всего покупок:</Title>
            {totalPurchases}

            <Title>Топ товаров:</Title>
            <div className={classNames(styles.tableRow, styles.roundedTop)}>
                <div className={styles.bold}>Название</div>
                <div className={styles.bold}>Продано</div>
            </div>

            {topPurchases.map(({ productName, totalSold }, index) => (
                <div
                    key={productName}
                    className={classNames(styles.tableRow, {
                        [styles.roundedBottom]: index === topPurchases.length - 1
                    })}
                >
                    <div className={styles.cell}>{productName}</div>
                    <div className={styles.cell}>{totalSold}</div>
                </div>
            ))}

            <Spacing size={20} />

            <LatestPurchases />

            <Spacing size={20} />
        </div>
    );
};
