import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

const selectShopPagePart = (state: StateSchema) => state.shopPagePart;

export default selectShopPagePart;
