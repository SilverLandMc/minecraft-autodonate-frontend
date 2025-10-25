import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type AppThunkDispatch = ThunkDispatch<StateSchema, unknown, Action>;
