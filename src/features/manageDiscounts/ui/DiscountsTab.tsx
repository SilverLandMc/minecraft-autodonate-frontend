import { FunctionComponent, useState } from 'react';
import { DiscountEdit } from './components/discountEdit/DiscountEdit';
import { DiscountList } from './components/discountList/DiscountList';

export enum ActiveSubTab {
    LIST = 'list',
    EDIT = 'edit'
}

export interface DiscountComponentProps {
    setActiveSubTab(subTab: ActiveSubTab): void;
    setEditingDiscountId?(id: string): void;
    editingDiscountId?: string;
    className?: string;
}

const componentBySubTab: Record<ActiveSubTab, FunctionComponent<DiscountComponentProps>> = {
    [ActiveSubTab.LIST]: DiscountList,
    [ActiveSubTab.EDIT]: DiscountEdit
};

interface Props {
    className?: string;
}

export const DiscountsTab: FunctionComponent<Props> = ({ className }) => {
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
