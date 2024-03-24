import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

const selectAdminPagePart = (state: StateSchema) => state.adminPagePart;

export default selectAdminPagePart;
