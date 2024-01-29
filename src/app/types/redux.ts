import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export type AppThunkDispatch = ThunkDispatch<StateSchema, unknown, Action>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, StateSchema, unknown, Action<string>>;
