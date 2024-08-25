import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta = {
    title: 'widgets/Header',
    component: Header,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        className: { description: 'Имя класса, котрое будет добавлено к обёртке' }
    }
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
