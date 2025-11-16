import { createRoot } from 'react-dom/client';
import { App } from '@/app/App';
import { AppContainer } from '@/app/providers/appContainer';
import { initializeSentry } from '@/shared/lib/initializeSentry';
import '@/app/styles/index.scss';

if (!__IS_DEV__) {
    initializeSentry();
}

const root = createRoot(document.getElementById('root')!);

root.render(
    <AppContainer>
        <App />
    </AppContainer>
);
