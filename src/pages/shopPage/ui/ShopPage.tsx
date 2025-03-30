import { FunctionComponent, useEffect } from 'react';
import { productStore } from '@/entities/product';
import ShopPagePure from './ShopPagePure';

const ShopPage: FunctionComponent = () => {
    const { fetchProducts } = productStore;

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return <ShopPagePure />;
};

export default ShopPage;
