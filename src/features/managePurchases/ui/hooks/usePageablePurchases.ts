import { ChangeEvent, useMemo, useState } from 'react';
import { useLatestPurchases } from '@/entities/purchase';

export const usePageablePurchases = () => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const pageParameters: any = useMemo(
        () => ({ page: currentPageNumber, size: pageSize }),
        [currentPageNumber, pageSize]
    );
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

    const { empty: isEmpty, content, first: isFirst, last: isLast, totalPages } = purchaseInfo;

    const jumpToLastPage = () => setCurrentPageNumber(totalPages);

    return {
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
    };
};
