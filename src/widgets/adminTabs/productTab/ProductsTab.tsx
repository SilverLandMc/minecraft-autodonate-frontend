import { FunctionComponent, useState } from 'react';
import { ProductEdit } from '@/widgets/adminTabs/productTab/components/productEdit/ProductEdit';
import { ProductsList } from '@/widgets/adminTabs/productTab/components/productList/ProductsList';

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
    [ActiveSubTab.LIST]: ProductsList,
    [ActiveSubTab.EDIT]: ProductEdit
};

export const ProductsTab: FunctionComponent = () => {
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
