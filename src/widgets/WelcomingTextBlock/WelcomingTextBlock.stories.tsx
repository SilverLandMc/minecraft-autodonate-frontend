import type { Meta, StoryObj } from '@storybook/react';
import WelcomingTextBlock from './WelcomingTextBlock';

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
