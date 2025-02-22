import { PlayWithBlogger } from './PlayWithBlogger';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'widgets/PlayWithBlogger',
    component: PlayWithBlogger,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof PlayWithBlogger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
