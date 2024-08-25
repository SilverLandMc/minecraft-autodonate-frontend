import type { Meta, StoryObj } from '@storybook/react';
import PlayerAndServerInfoBlock from './PlayerAndServerInfoBlock';

const meta = {
    title: 'widgets/PlayerAndServerInfoBlock',
    component: PlayerAndServerInfoBlock,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        className: { description: 'Имя класса, котрое будет добавлено к обёртке' }
    }
} satisfies Meta<typeof PlayerAndServerInfoBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
