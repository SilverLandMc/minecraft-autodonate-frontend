import FailSafeImage from './FailSafeImage';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'shared/FailSafeImage',
    component: FailSafeImage,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        src: { control: 'file', description: 'URL изображения' },
        fallbackSrc: { control: 'file', description: 'URL изображения на случай, если не загрузится основное' }
    }
} satisfies Meta<typeof FailSafeImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: 'Изображение с корректным URL',
    args: {
        src: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        fallbackSrc: 'https://qph.cf2.quoracdn.net/main-qimg-31454400bc5d9ab425c78a0cb4740cc5.webp'
    }
};

export const WrongURL: Story = {
    name: 'Изображение с некорректным URL',
    args: {
        src: 'https://какой-то.несуществующий.адрес',
        fallbackSrc: 'https://qph.cf2.quoracdn.net/main-qimg-31454400bc5d9ab425c78a0cb4740cc5.webp'
    }
};
