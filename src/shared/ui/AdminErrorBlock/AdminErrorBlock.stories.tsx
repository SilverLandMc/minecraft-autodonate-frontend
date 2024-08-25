import type { Meta, StoryObj } from '@storybook/react';
import AdminErrorBlock from './AdminErrorBlock';

const meta = {
    title: 'shared/AdminErrorBlock',
    component: AdminErrorBlock,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text', description: 'Текст ошибки' }
    }
} satisfies Meta<typeof AdminErrorBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: 'Текст по умолчанию' };
