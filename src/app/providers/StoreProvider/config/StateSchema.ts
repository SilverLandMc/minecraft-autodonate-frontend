import { MainPagePartState } from 'pages/MainPage/slices/mainPageSlice';
import { ShopPagePartState } from 'pages/ShopPage/slices/shopPageSlice';
import { AdminPagePartState } from 'pages/AdminPage/slices/adminPageSlice';

export interface StateSchema {
    mainPagePart: MainPagePartState;
    shopPagePart: ShopPagePartState;
    adminPagePart: AdminPagePartState;
}
