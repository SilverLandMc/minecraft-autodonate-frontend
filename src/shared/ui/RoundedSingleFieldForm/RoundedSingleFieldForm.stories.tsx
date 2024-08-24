import type { Meta, StoryObj } from '@storybook/react';
import RoundedSingleFieldForm from './RoundedSingleFieldForm';
import noop from 'shared/lib/noop/noop';
import { withCustomWrapper } from '../../../../config/storybook/decorators';

const meta = {
    title: 'shared/RoundedSingleFieldForm',
    component: RoundedSingleFieldForm,
    decorators: withCustomWrapper,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        buttonText: { control: 'text' },
        readonly: { control: 'boolean' },
        redButton: { control: 'boolean' },
        placeholderText: { control: 'text' },
        value: { control: 'text' }
    },
    args: { onChange: noop }
} satisfies Meta<typeof RoundedSingleFieldForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: 'Состояние по умолчанию' };

export const Readonly: Story = {
    name: 'Состояние readonly',
    args: { readonly: true, value: 'Сообщение', buttonText: 'Понятно' }
};

export const WithRedButton: Story = {
    name: 'С красной кнопкой',
    args: { redButton: true, buttonText: 'Выйти' }
};
