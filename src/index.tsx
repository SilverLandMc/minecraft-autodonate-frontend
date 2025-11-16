import { createCtx } from '@reatom/framework';
import { reatomContext } from '@reatom/npm-react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app/App';
import { AppContainer } from '@/app/providers/appContainer';
import { initializeSentry } from '@/shared/lib/initializeSentry';
import '@/app/styles/index.scss';

if (!__IS_DEV__) {
    initializeSentry();
}

const ctx = createCtx();

const root = createRoot(document.getElementById('root')!);

root.render(
    <reatomContext.Provider value={ctx}>
        <AppContainer>
            <App />
        </AppContainer>
    </reatomContext.Provider>
);
