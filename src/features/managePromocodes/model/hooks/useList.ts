import { ChangeEvent, useState } from 'react';
import { deletePromoCode, usePromoCodesList } from '@/entities/promocode';
import { ActiveSubTab, PromoCodeComponentProps } from '../../ui/PromoCodesTab';

export const useList = ({ setEditingPromoCodeId, setActiveSubTab }: PromoCodeComponentProps) => {
    const [isOnlyActualMode, setIsOnlyActualMode] = useState(true);
    const [reFetchFlag, setReFetchFlag] = useState(false);
    const { promoCodesList, isLoading, error } = usePromoCodesList({ isOnlyActualMode, reFetchFlag });

    const toggleOnlyActual = (event: ChangeEvent<HTMLInputElement>) => setIsOnlyActualMode(event.target.checked);

    const handleEditClick = (id: string) => () => {
        setEditingPromoCodeId?.(id);
        setActiveSubTab(ActiveSubTab.EDIT);
    };

    const handleCreateClick = () => {
        setActiveSubTab(ActiveSubTab.EDIT);
    };

    const handleDelete = (id: string) => async () => {
        try {
            await deletePromoCode(id);
            setReFetchFlag(!reFetchFlag);
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert('Ошибка при удалении промокода!');
        }
    };

    return {
        isLoading,
        promoCodesList,
        error,
        handleEditClick,
        handleDelete,
        isOnlyActualMode,
        toggleOnlyActual,
        handleCreateClick
    };
};
