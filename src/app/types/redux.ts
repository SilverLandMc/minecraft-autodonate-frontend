import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

export type AppThunkDispatch = ThunkDispatch<StateSchema, unknown, Action>;
