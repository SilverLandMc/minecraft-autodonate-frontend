import { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './AdminNavBar.module.scss';

export enum AdminTab {
    PURCHASES = 'purchases',
    DISCOUNTS = 'discounts',
    PROMO_CODES = 'promoCodes',
    PRODUCTS = 'products'
}

const nameByAdminTabMap: Record<AdminTab, string> = {
    [AdminTab.PURCHASES]: 'Покупки',
    [AdminTab.DISCOUNTS]: 'Скидки',
    [AdminTab.PROMO_CODES]: 'Промокоды',
    [AdminTab.PRODUCTS]: 'Продукты'
};

interface Props {
    activeTab: AdminTab;
    setActiveTab(adminTab: AdminTab): void;
}

const AdminNavBar: FunctionComponent<Props> = ({ activeTab, setActiveTab }) => {
    const changeTab = (tab: AdminTab) => () => setActiveTab(tab);

    return (
        <div className={styles.navBar}>
            {Object.values(AdminTab).map((adminTab) => (
                <span
                    key={adminTab}
                    className={classNames(styles.tab, { [styles.active]: adminTab === activeTab })}
                    onClick={changeTab(adminTab)}
                >
                    {nameByAdminTabMap[adminTab]}
                </span>
            ))}
        </div>
    );
};

export default AdminNavBar;
