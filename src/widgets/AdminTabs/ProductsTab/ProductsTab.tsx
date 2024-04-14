import { FunctionComponent, useState } from 'react';
import ProductsList from 'widgets/AdminTabs/ProductsTab/components/ProductsList/ProductsList';
import ProductCreation from 'widgets/AdminTabs/ProductsTab/components/ProductCreation/ProductCreation';
import ProductEditing from 'widgets/AdminTabs/ProductsTab/components/ProductEditing/ProductEditing';

export enum ActiveSubTab {
    LIST = 'list',
    CREATION = 'creation',
    EDITING = 'editing'
}

export interface ProductComponentProps {
    setActiveSubTab(subTab: ActiveSubTab): void;
    setEditingProductId?(id: string): void;
    editingProductId?: string;
    className?: string;
}

const componentBySubTab: Record<ActiveSubTab, FunctionComponent<ProductComponentProps>> = {
    [ActiveSubTab.LIST]: ProductsList,
    [ActiveSubTab.CREATION]: ProductCreation,
    [ActiveSubTab.EDITING]: ProductEditing
};

interface Props {
    className?: string;
}

const ProductsTab: FunctionComponent<Props> = ({ className }) => {
    const [activeSubTab, setActiveSubTab] = useState<ActiveSubTab>(ActiveSubTab.LIST);
    const [editingProductId, setEditingProductId] = useState<string>();

    const ActiveSubTabComponent = componentBySubTab[activeSubTab];

    return (
        <div className={className}>
            <ActiveSubTabComponent
                editingProductId={editingProductId}
                setActiveSubTab={setActiveSubTab}
                setEditingProductId={setEditingProductId}
            />
        </div>
    );
};

export default ProductsTab;
