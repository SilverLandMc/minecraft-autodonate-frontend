import type { Meta, StoryObj } from '@storybook/react';
import ShopPage from './ShopPage';
import { ProductCategory } from 'app/const/enum/ProductCategory';

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
