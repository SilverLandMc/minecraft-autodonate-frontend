import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

const selectMainPagePart = (state: StateSchema) => state.mainPagePart;

export default selectMainPagePart;
