import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { FunctionComponent, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

interface Props extends PropsWithChildren {
    initialState?: StateSchema;
}

export const StoreProvider: FunctionComponent<Props> = ({ children, initialState }) => {
    const store = createReduxStore(initialState);

    return <Provider store={store}>{children}</Provider>;
};
