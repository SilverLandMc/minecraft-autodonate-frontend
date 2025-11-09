import { FunctionComponent } from 'react';
import classNames from '@/shared/lib/aliases/classNames';
import { Spacing } from '@/shared/ui';
import AdminErrorBlock from '@/shared/ui/adminErrorBlock/AdminErrorBlock';
import { RunnerLoader } from '@/shared/ui/runnerLoader';
import Title from '@/shared/ui/title/Title';
import { usePageablePurchases } from '../../../model/hooks/usePageablePurchases';
import styles from './LatestPurchases.module.scss';

export const LatestPurchases: FunctionComponent = () => {
    const {
        isLoading,
        error,
        isEmpty,
        content,
        isFirst,
        isLast,
        jumpToFirstPage,
        jumpToLastPage,
        decrementPageNumber,
        currentPageNumber,
        incrementPageNumber,
        pageSize,
        handlePageSizeSelect
    } = usePageablePurchases();

    if (isLoading) {
        return <RunnerLoader />;
    }

    if (error) {
        return <AdminErrorBlock text="Ошибка при загрузке последних покупок" />;
    }

    if (isEmpty) {
        return <div className={styles.error}>Пока что нет покупок</div>;
    }

    return (
        <div className={styles.latestPurchases}>
            <Title>Последние покупки:</Title>

            <div className={classNames(styles.tableRow, styles.roundedTop)}>
                <div className={styles.bold}>ID</div>
                <div className={styles.bold}>Игрок</div>
                <div className={styles.bold}>Стоимость</div>
                <div className={styles.bold}>Промокод</div>
                <div className={styles.bold}>Статус</div>
                <div className={styles.bold}>Продукты</div>
            </div>

            {/* todo Бэкенд сломал интерфейсы, попинать бэкенд */}
            {/* @ts-ignore */}
            {content.map(({ paymentId, playerName, totalPrice, promocode, status, paymentProductList }, index) => (
                <div
                    key={paymentId}
                    className={classNames(styles.tableRow, {
                        [styles.roundedBottom]: index === content.length - 1
                    })}
                >
                    <div className={styles.cell}>{paymentId}</div>
                    <div className={styles.cell}>{playerName}</div>
                    <div className={styles.cell}>{totalPrice}</div>
                    <div className={styles.cell}>{promocode?.name ?? '-'}</div>
                    <div className={styles.cell}>{status}</div>
                    <div className={styles.cell}>{paymentProductList.length}</div>
                </div>
            ))}

            <Spacing size={10} />

            <div className={styles.pageNumberRow}>
                {!isFirst && (
                    <div className={styles.pageNumberControl} onClick={jumpToFirstPage}>
                        &laquo;
                    </div>
                )}

                {!isFirst && (
                    <div className={styles.pageNumberControl} onClick={decrementPageNumber}>
                        &lt;
                    </div>
                )}

                <div className={styles.pageNumber}>{currentPageNumber}</div>

                {!isLast && (
                    <div className={styles.pageNumberControl} onClick={incrementPageNumber}>
                        &gt;
                    </div>
                )}

                {!isLast && (
                    <div className={styles.pageNumberControl} onClick={jumpToLastPage}>
                        &raquo;
                    </div>
                )}
            </div>

            <Spacing size={10} />

            <label>Показывать по: </label>

            <select value={pageSize} onChange={handlePageSizeSelect}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        </div>
    );
};
