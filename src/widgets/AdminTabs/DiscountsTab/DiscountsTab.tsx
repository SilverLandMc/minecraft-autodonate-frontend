import { ComponentType, FunctionComponent, useState } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './DiscountsTab.module.scss';
import DiscountsList from 'widgets/AdminTabs/DiscountsTab/components/DiscountsList/DiscountsList';
import DiscountCreation from 'widgets/AdminTabs/DiscountsTab/components/DiscountCreation/DiscountCreation';
import DiscountEditing from 'widgets/AdminTabs/DiscountsTab/components/DiscountEditing/DiscountEditing';

export enum ActiveSubTab {
    LIST = 'list',
    CREATION = 'creation',
    EDITING = 'editing'
}

const componentBySubTab: Record<ActiveSubTab, ComponentType<any>> = {
    [ActiveSubTab.LIST]: DiscountsList,
    [ActiveSubTab.CREATION]: DiscountCreation,
    [ActiveSubTab.EDITING]: DiscountEditing
};

interface Props {
    className?: string;
}

const DiscountsTab: FunctionComponent<Props> = ({ className }) => {
    const [activeSubTab, setActiveSubTab] = useState<ActiveSubTab>(ActiveSubTab.LIST);

    const ActiveSubTabComponent = componentBySubTab[activeSubTab];

    return (
        <div className={classNames(styles.discountsTab, [className])}>
            <ActiveSubTabComponent setActiveSubTab={setActiveSubTab} />
        </div>
    );
};

export default DiscountsTab;
