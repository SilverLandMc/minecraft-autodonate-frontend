import { FunctionComponent } from 'react';
import styles from './AdminNavBar.module.scss';
import classNames from 'shared/lib/aliases/classNames';

export enum AdminTab {
    PURCHASES = 'purchases',
    DISCOUNTS = 'discounts',
    PROMO_CODES = 'promoCodes',
    PRODUCTS = 'products'
}

const NameByAdminTab: Record<AdminTab, string> = {
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
    return (
        <div className={styles.navBar}>
            {Object.values(AdminTab).map((adminTab) => {
                const changeTab = () => setActiveTab(adminTab);

                return (
                    <span
                        key={adminTab}
                        className={classNames(styles.tab, { [styles.active]: adminTab === activeTab })}
                        onClick={changeTab}
                    >
                        {NameByAdminTab[adminTab]}
                    </span>
                );
            })}
        </div>
    );
};

export default AdminNavBar;
