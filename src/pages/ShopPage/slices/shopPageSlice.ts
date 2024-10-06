import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCategory } from 'app/const/enum/ProductCategory';
import { ProductOutDto } from 'app/types/api/apiTypes';

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
        },
        resetCategoriesLoaded: (state) => {
            state.isCategoryLoaded = {
                ranks: false,
                boosters: false,
                cases: false,
                resources: false,
                other: false
            };
        }
    }
});

export const { setProducts, setFetchingFailed, resetCategoriesLoaded } = shopPageSlice.actions;

export default shopPageSlice.reducer;
