import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

const selectShopPagePart = (state: StateSchema) => state.adminPagePart;

export default selectShopPagePart;
