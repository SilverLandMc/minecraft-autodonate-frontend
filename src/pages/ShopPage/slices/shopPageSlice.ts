import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductOutDto } from 'app/types/api/apiTypes';
import { ProductCategory } from 'app/const/enum/ProductCategory';

interface SetProductsPayload {
    products: ProductOutDto[];
    productCategory: ProductCategory;
}

export interface ShopPagePartState {
    isFetchingFailed: boolean;
    productsByCategory: Record<ProductCategory, ProductOutDto[]>;
    isCategoryLoaded: Record<ProductCategory, boolean>;
}

const initialState: ShopPagePartState = {
    isFetchingFailed: false,
    productsByCategory: {
        [ProductCategory.RANKS]: [],
        [ProductCategory.BOOSTERS]: [],
        [ProductCategory.CASES]: [],
        [ProductCategory.RESOURCES]: [],
        [ProductCategory.OTHER]: []
    },
    isCategoryLoaded: {
        [ProductCategory.RANKS]: false,
        [ProductCategory.BOOSTERS]: false,
        [ProductCategory.CASES]: false,
        [ProductCategory.RESOURCES]: false,
        [ProductCategory.OTHER]: false
    }
};

export const shopPageSlice = createSlice({
    name: 'shopPagePart',
    initialState,
    reducers: {
        setProducts: (state, { payload }: PayloadAction<SetProductsPayload>) => {
            state.productsByCategory[payload.productCategory] = payload.products;
            state.isCategoryLoaded[payload.productCategory] = true;
        },
        setFetchingFailed: (state) => {
            state.isFetchingFailed = true;
        }
    }
});

export const { setProducts, setFetchingFailed } = shopPageSlice.actions;

export default shopPageSlice.reducer;
