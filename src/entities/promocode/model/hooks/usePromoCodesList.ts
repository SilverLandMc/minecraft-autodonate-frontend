import { useAsync } from 'react-use';
import { fetchPromoCodesList } from '../../api/fetchPromoCodesList';

interface Props {
    isOnlyActualMode?: boolean;
    reFetchFlag?: boolean;
}

export const usePromoCodesList = ({ reFetchFlag, isOnlyActualMode }: Props) => {
    const {
        value: rawPromoCodesList,
        loading: isLoading,
        error
    } = useAsync(async () => await fetchPromoCodesList(), [reFetchFlag]);

    const promoCodesList = isOnlyActualMode
        ? rawPromoCodesList?.filter(({ isDeleted }) => !isDeleted)
        : rawPromoCodesList;

    return { promoCodesList, isLoading, error };
};
