import { createSelector } from 'reselect';
import selectShopPagePart from 'shared/redux/selectors/selectShopPagePart';
import { ShopPagePartState } from 'pages/ShopPage/slices/shopPageSlice';

const selectShopInfo = createSelector(
    selectShopPagePart,
    ({ productsByCategory, isCategoryLoaded, isFetchingFailed }: ShopPagePartState) => ({
        productsByCategory,
        isCategoryLoaded,
        isFetchingFailed
    })
);

export default selectShopInfo;
