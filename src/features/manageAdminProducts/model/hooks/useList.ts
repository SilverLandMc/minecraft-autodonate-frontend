import { useState } from 'react';
import { deleteProduct, useProductList } from '@/entities/adminProduct';
import { ProductCategory } from '@/shared/enums/ProductCategory';
import { ActiveSubTab, ProductComponentProps } from '../../ui/ProductTab';

export const useList = ({ setEditingProductId, setActiveSubTab }: ProductComponentProps) => {
    const [activeProductCategory, setActiveProductCategory] = useState<ProductCategory>(ProductCategory.RANKS);
    const [reFetchFlag, setReFetchFlag] = useState(false);

    const { productList, isLoading, error } = useProductList({ productCategory: activeProductCategory, reFetchFlag });
    const changeCategory = (category: ProductCategory) => () => setActiveProductCategory(category);

    const handleEditClick = (id: string) => () => {
        setEditingProductId?.(id);
        setActiveSubTab(ActiveSubTab.EDIT);
    };

    const handleDelete = (id: string) => async () => {
        try {
            await deleteProduct(id);
            setReFetchFlag(!reFetchFlag);
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert('Ошибка при удалении продукта!');
        }
    };

    return {
        productList,
        isLoading,
        error,
        changeCategory,
        handleEditClick,
        handleDelete,
        activeProductCategory
    };
};
