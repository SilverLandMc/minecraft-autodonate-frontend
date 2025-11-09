import { ChangeEvent, useState } from 'react';
import { deleteDiscount, useDiscountsList } from '@/entities/discount';
import { ActiveSubTab, DiscountComponentProps } from '../../ui/DiscountsTab';

export const useList = ({ setEditingDiscountId, setActiveSubTab }: DiscountComponentProps) => {
    const [reFetchListFlag, setReFetchListFlag] = useState(false);
    const [isOnlyActualMode, setIsOnlyActualMode] = useState(true);
    const { discountsList, error, isLoading } = useDiscountsList({ reFetchListFlag, isOnlyActualMode });

    const handleCreateClick = () => setActiveSubTab(ActiveSubTab.EDIT);

    const handleDelete = (id: string) => async () => {
        try {
            await deleteDiscount(id);
            setReFetchListFlag(!reFetchListFlag);
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert('Ошибка при удалении скидки!');
        }
    };

    const handleEditClick = (id: string) => () => {
        setEditingDiscountId?.(id);
        setActiveSubTab(ActiveSubTab.EDIT);
    };

    const toggleOnlyActual = (event: ChangeEvent<HTMLInputElement>) => setIsOnlyActualMode(event.target.checked);

    return {
        isOnlyActualMode,
        discountsList,
        error,
        isLoading,
        handleCreateClick,
        handleDelete,
        handleEditClick,
        toggleOnlyActual
    };
};
