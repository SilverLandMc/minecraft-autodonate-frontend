import WelcomingTextBlock from './WelcomingTextBlock';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'widgets/WelcomingTextBlock',
    component: WelcomingTextBlock,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof WelcomingTextBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
