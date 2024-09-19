import type { Preview } from '@storybook/react';
import '../../src/app/styles/index.scss';
import { AppContainerDecorator } from '../../src/shared/config/storybook/appContainerDecorator/AppContainerDecorator';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { handlers } from './mocks/handlers';

initialize();

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },
        msw: {
            handlers
        }
    },
    decorators: [AppContainerDecorator],
    loaders: [mswLoader]
};

export default preview;
