import { FunctionComponent, useState } from 'react';
import DiscountCreation from 'widgets/AdminTabs/DiscountsTab/components/DiscountCreation/DiscountCreation';
import DiscountEditing from 'widgets/AdminTabs/DiscountsTab/components/DiscountEditing/DiscountEditing';
import DiscountsList from 'widgets/AdminTabs/DiscountsTab/components/DiscountsList/DiscountsList';

export enum ActiveSubTab {
    LIST = 'list',
    CREATION = 'creation',
    EDITING = 'editing'
}

export interface DiscountComponentProps {
    setActiveSubTab(subTab: ActiveSubTab): void;
    setEditingDiscountId?(id: string): void;
    editingDiscountId?: string;
    className?: string;
}

const componentBySubTab: Record<ActiveSubTab, FunctionComponent<DiscountComponentProps>> = {
    [ActiveSubTab.LIST]: DiscountsList,
    [ActiveSubTab.CREATION]: DiscountCreation,
    [ActiveSubTab.EDITING]: DiscountEditing
};

interface Props {
    className?: string;
}

const DiscountsTab: FunctionComponent<Props> = ({ className }) => {
    const [activeSubTab, setActiveSubTab] = useState<ActiveSubTab>(ActiveSubTab.LIST);
    const [editingDiscountId, setEditingDiscountId] = useState<string>();

    const ActiveSubTabComponent = componentBySubTab[activeSubTab];

    return (
        <div className={className}>
            <ActiveSubTabComponent
                setActiveSubTab={setActiveSubTab}
                editingDiscountId={editingDiscountId}
                setEditingDiscountId={setEditingDiscountId}
            />
        </div>
    );
};

export default DiscountsTab;
