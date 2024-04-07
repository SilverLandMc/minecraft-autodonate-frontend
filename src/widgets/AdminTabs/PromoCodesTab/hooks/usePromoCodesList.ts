import { useAsync } from 'react-use';
import fetchPromoCodesList from 'widgets/AdminTabs/PromoCodesTab/actions/fetchPromoCodesList';

interface Props {
    isOnlyActualMode?: boolean;
    reFetchFlag?: boolean;
}

const usePromoCodesList = ({ reFetchFlag, isOnlyActualMode }: Props) => {
    const {
        value: rawPromoCodesList,
        loading: isLoading,
        error
    } = useAsync(async () => await fetchPromoCodesList(), [reFetchFlag]);

    const promoCodesList = isOnlyActualMode ? rawPromoCodesList?.filter(({ deleted }) => !deleted) : rawPromoCodesList;

    return { promoCodesList, isLoading, error };
};

export default usePromoCodesList;
