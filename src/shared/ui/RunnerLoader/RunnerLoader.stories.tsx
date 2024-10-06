import RunnerLoader from './RunnerLoader';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'shared/RunnerLoader',
    component: RunnerLoader,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        small: { control: 'boolean', description: 'Делает изображение меньше' },
        className: { description: 'Имя класса, котрое будет добавлено к обёртке' }
    }
} satisfies Meta<typeof RunnerLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: 'Лоадер обычного размера'
};

export const Small: Story = {
    name: 'Лоадер уменьшенного размера',
    args: { small: true }
};
