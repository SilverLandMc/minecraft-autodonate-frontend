import { AdminPagePartState } from 'pages/adminPage/slices/adminPageSlice';
import { ShopPagePartState } from 'pages/shopPage/slices/shopPageSlice';

export interface StateSchema {
    shopPagePart: ShopPagePartState;
    adminPagePart: AdminPagePartState;
}
