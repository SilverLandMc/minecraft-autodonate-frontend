import type { Meta, StoryObj } from '@storybook/react';
import Footer from './Footer';

const meta = {
    title: 'widgets/Footer',
    component: Footer,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        className: { description: 'Имя класса, котрое будет добавлено к обёртке' }
    }
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
