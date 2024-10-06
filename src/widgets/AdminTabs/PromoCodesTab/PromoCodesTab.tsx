import { FunctionComponent, useState } from 'react';
import PromoCodeCreation from 'widgets/AdminTabs/PromoCodesTab/components/PromoCodeCreation/PromoCodeCreation';
import PromoCodeEditing from 'widgets/AdminTabs/PromoCodesTab/components/PromoCodeEditing/PromoCodeEditing';
import PromoCodesList from 'widgets/AdminTabs/PromoCodesTab/components/PromoCodesList/PromoCodesList';

export enum ActiveSubTab {
    LIST = 'list',
    CREATION = 'creation',
    EDITING = 'editing'
}

export interface PromoCodeComponentProps {
    setActiveSubTab(subTab: ActiveSubTab): void;
    setEditingPromoCodeId?(id: string): void;
    editingPromoCodeId?: string;
    className?: string;
}

const componentBySubTab: Record<ActiveSubTab, FunctionComponent<PromoCodeComponentProps>> = {
    [ActiveSubTab.LIST]: PromoCodesList,
    [ActiveSubTab.CREATION]: PromoCodeCreation,
    [ActiveSubTab.EDITING]: PromoCodeEditing
};

interface Props {
    className?: string;
}

const PromoCodesTab: FunctionComponent<Props> = ({ className }) => {
    const [activeSubTab, setActiveSubTab] = useState<ActiveSubTab>(ActiveSubTab.LIST);
    const [editingPromoCodeId, setEditingPromoCodeId] = useState<string>();

    const ActiveSubTabComponent = componentBySubTab[activeSubTab];

    return (
        <div className={className}>
            <ActiveSubTabComponent
                editingPromoCodeId={editingPromoCodeId}
                setActiveSubTab={setActiveSubTab}
                setEditingPromoCodeId={setEditingPromoCodeId}
            />
        </div>
    );
};

export default PromoCodesTab;
