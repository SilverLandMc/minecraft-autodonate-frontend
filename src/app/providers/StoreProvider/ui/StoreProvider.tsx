import { FunctionComponent, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

interface Props extends PropsWithChildren {
    initialState?: StateSchema;
}

export const StoreProvider: FunctionComponent<Props> = ({ children, initialState }) => {
    const store = createReduxStore(initialState);

    return <Provider store={store}>{children}</Provider>;
};
