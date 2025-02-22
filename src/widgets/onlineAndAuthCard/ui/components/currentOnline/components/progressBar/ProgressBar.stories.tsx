import { SizedDecorator } from 'shared/config/storybook/sizedDecorator/SizedDecorator';
import { ProgressBar } from './ProgressBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'shared/progressBar',
    component: ProgressBar,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        percentFilled: { control: 'number', description: 'Процент заполнения прогрессбара' }
    }
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = { name: 'В контейнере шириной 320', args: { percentFilled: 42 } };
Mobile.decorators = [SizedDecorator({ width: 320 })];

export const Tablet: Story = { name: 'В контейнере шириной 740', args: { percentFilled: 42 } };
Tablet.decorators = [SizedDecorator({ width: 740 })];

export const Medium: Story = { name: 'В контейнере шириной 1024', args: { percentFilled: 42 } };
Medium.decorators = [SizedDecorator({ width: 1024 })];

export const Large: Story = { name: 'В контейнере шириной 1440', args: { percentFilled: 42 } };
Large.decorators = [SizedDecorator({ width: 1440 })];
