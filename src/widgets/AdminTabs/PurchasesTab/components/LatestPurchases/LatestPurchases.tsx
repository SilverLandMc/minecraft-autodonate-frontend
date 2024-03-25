import { ChangeEvent, FunctionComponent, useMemo, useState } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './LatestPurchases.module.scss';
import useLatestPurchases from 'widgets/AdminTabs/PurchasesTab/components/LatestPurchases/hooks/useLatestPurchases';
import RunnerLoader from 'shared/ui/RunnerLoader/RunnerLoader';
import { PageDto } from 'app/types/api/apiTypes';
import Title from 'shared/ui/Title/Title';
import Spacing from 'shared/ui/spacing/Spacing';

const LatestPurchases: FunctionComponent = () => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const pageParameters: PageDto = useMemo(() => {
        return { page: currentPageNumber, size: pageSize };
    }, [currentPageNumber, pageSize]);
    const { purchaseInfo, isLoading, error } = useLatestPurchases(pageParameters);

    const incrementPageNumber = () => setCurrentPageNumber(currentPageNumber + 1);
    const decrementPageNumber = () => {
        if (currentPageNumber === 1) {
            return;
        }
        setCurrentPageNumber(currentPageNumber - 1);
    };

    const jumpToFirstPage = () => setCurrentPageNumber(1);

    const handlePageSizeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setCurrentPageNumber(1);
        setPageSize(Number(event.target.value));
    };

    if (isLoading) {
        return <RunnerLoader />;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    const { empty: isEmpty, content, first: isFirst, last: isLast, totalPages } = purchaseInfo;

    const jumpToLastPage = () => setCurrentPageNumber(totalPages);

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

export default LatestPurchases;
