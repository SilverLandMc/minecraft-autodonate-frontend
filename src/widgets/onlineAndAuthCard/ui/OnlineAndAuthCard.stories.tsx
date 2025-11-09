import { OnlineAndAuthCard } from './OnlineAndAuthCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'widgets/onlineAndAuthCard',
    component: OnlineAndAuthCard,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof OnlineAndAuthCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
