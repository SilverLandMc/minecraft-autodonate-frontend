import { FunctionComponent, useState } from 'react';
import { PromocodeEdit } from './components/promocodeEdit/PromocodeEdit';
import { PromoCodeList } from './components/promocodeList/PromoCodeList';

export enum ActiveSubTab {
    LIST = 'list',
    EDIT = 'edit'
}

export interface PromoCodeComponentProps {
    setActiveSubTab(subTab: ActiveSubTab): void;
    setEditingPromoCodeId?(id: string): void;
    editingPromoCodeId?: string;
    className?: string;
}

const componentBySubTab: Record<ActiveSubTab, FunctionComponent<PromoCodeComponentProps>> = {
    [ActiveSubTab.LIST]: PromoCodeList,
    [ActiveSubTab.EDIT]: PromocodeEdit
};

export const PromoCodesTab: FunctionComponent = () => {
    const [activeSubTab, setActiveSubTab] = useState<ActiveSubTab>(ActiveSubTab.LIST);
    const [editingPromoCodeId, setEditingPromoCodeId] = useState<string>();

    const ActiveSubTabComponent = componentBySubTab[activeSubTab];

    return (
        <ActiveSubTabComponent
            editingPromoCodeId={editingPromoCodeId}
            setActiveSubTab={setActiveSubTab}
            setEditingPromoCodeId={setEditingPromoCodeId}
        />
    );
};
