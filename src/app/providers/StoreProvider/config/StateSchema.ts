import { MainPagePartState } from 'pages/MainPage/slices/mainPageSlice';
import { ShopPagePartState } from 'pages/ShopPage/slices/shopPageSlice';

export interface StateSchema {
    mainPagePart: MainPagePartState;
    shopPagePart: ShopPagePartState;
}
