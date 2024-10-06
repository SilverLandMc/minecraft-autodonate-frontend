import { ProductCategory } from 'app/const/enum/ProductCategory';
import ShopPage from './ShopPage';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'pages/ShopPage',
    component: ShopPage,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {
        productCategory: ProductCategory.RANKS
    }
} satisfies Meta<typeof ShopPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
