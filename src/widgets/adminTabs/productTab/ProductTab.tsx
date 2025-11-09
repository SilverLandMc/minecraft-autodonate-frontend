import { FunctionComponent, useState } from 'react';
import { ProductList } from 'widgets/adminTabs/productTab/components/productList/ProductList';
import { ProductEdit } from '@/widgets/adminTabs/productTab/components/productEdit/ProductEdit';

export enum ActiveSubTab {
    LIST = 'list',
    EDIT = 'edit'
}

export interface ProductComponentProps {
    setActiveSubTab(subTab: ActiveSubTab): void;
    setEditingProductId?(id: string): void;
    editingProductId?: string;
}

const componentBySubTab: Record<ActiveSubTab, FunctionComponent<ProductComponentProps>> = {
    [ActiveSubTab.LIST]: ProductList,
    [ActiveSubTab.EDIT]: ProductEdit
};

export const ProductTab: FunctionComponent = () => {
    const [activeSubTab, setActiveSubTab] = useState<ActiveSubTab>(ActiveSubTab.LIST);
    const [editingProductId, setEditingProductId] = useState<string>();

    const ActiveSubTabComponent = componentBySubTab[activeSubTab];

    return (
        <ActiveSubTabComponent
            editingProductId={editingProductId}
            setActiveSubTab={setActiveSubTab}
            setEditingProductId={setEditingProductId}
        />
    );
};
