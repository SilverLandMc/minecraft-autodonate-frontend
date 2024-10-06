import noop from 'shared/lib/noop/noop';
import { withCustomWrapper } from '../../config/storybook';
import RoundedSingleFieldForm from './RoundedSingleFieldForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'shared/RoundedSingleFieldForm',
    component: RoundedSingleFieldForm,
    decorators: withCustomWrapper,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        buttonText: { control: 'text', description: 'Текст кнопки, которая находится справа в форме' },
        readonly: {
            control: 'boolean',
            description:
                'Флаг режима "только чтение" для поля ввода в форме. Используется для режима отображения информации в форме'
        },
        redButton: { control: 'boolean', description: 'Меняет цвет кнопки на красный' },
        placeholderText: { control: 'text', description: 'Текст плейсхолдера поля ввода, входящего в состав формы' },
        value: { control: 'text', description: 'Значение в поле ввода формы для controlled режима' },
        onChange: { description: 'Функция, которая будет передана в onChange поля ввода формы' }
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
