import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    core: { disableTelemetry: true },
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-essentials', '@storybook/addon-viewport'],
    framework: {
        name: '@storybook/react-vite',
        options: {
            builder: {
                viteConfigPath: 'vite/vite.config.ts'
            }
        }
    }
};

export default config;
