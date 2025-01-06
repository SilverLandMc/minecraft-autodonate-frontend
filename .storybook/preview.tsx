import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ComponentType } from 'react';
import { StorybookLayout } from './components/StorybookLayout';
import Media from '../src/app/const/enum/Media';

// https://storybook.js.org/docs/react/essentials/viewport
// region viewports
const projectViewports: typeof INITIAL_VIEWPORTS = {
    // region xs
    xsMin: {
        name: 'Mobile/min, xs',
        type: 'mobile',
        styles: {
            // Тут не получится использовать Media, всё ок
            width: `320px`,
            height: '600px'
        }
    },
    xsMiddle: {
        name: 'Mobile/middle, xs',
        type: 'mobile',
        styles: {
            // Тут не получится использовать Media, всё ок
            width: `450px`,
            height: '600px'
        }
    },
    xsMax: {
        name: 'Mobile/max, xs',
        type: 'mobile',
        styles: {
            width: `${Media.XS}px`,
            height: '600px'
        }
    },
    // endregion
    s: {
        name: 'Tablet, s',
        type: 'tablet',
        styles: {
            width: `${Media.S}px`,
            height: '700px'
        }
    },
    m: {
        name: 'MediumDesktop, m',
        type: 'desktop',
        styles: {
            width: `${Media.M}px`,
            height: '700px'
        }
    },
    l: {
        name: 'LargeDesktop, l',
        type: 'desktop',
        styles: {
            width: `${Media.L}px`,
            height: '900px'
        }
    }
};
// endregion

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },
        viewport: {
            viewports: projectViewports
        }
    },
    decorators: [
        (Story: ComponentType) => (
            <StorybookLayout>
                <Story />
            </StorybookLayout>
        )
    ]
};

export default preview;
