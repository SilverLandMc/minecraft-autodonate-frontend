import { Header } from './Header';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'widgets/header',
    component: Header,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
