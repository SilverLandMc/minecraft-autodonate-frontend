import type { Preview } from '@storybook/react';
import '../../src/app/styles/index.scss';
import { AppContainerDecorator } from '../../src/shared/config/storybook/appContainerDecorator/AppContainerDecorator';
import { setupSinonMocks } from './mocks/setupSinonMocks';

setupSinonMocks();

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    },
    decorators: [AppContainerDecorator]
};

export default preview;
