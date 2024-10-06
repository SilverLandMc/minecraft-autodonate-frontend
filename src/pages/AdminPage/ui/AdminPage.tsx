import AdminAccessGuard from 'pages/AdminPage/layouts/AdminAccessGuard';
import { ComponentType, FunctionComponent, useState } from 'react';
import Section from 'shared/ui/Section/Section';
import Spacing from 'shared/ui/spacing/Spacing';
import AdminNavBar, { AdminTab } from 'widgets/AdminNavBar/AdminNavBar';
import DiscountsTab from 'widgets/AdminTabs/DiscountsTab/DiscountsTab';
import ProductsTab from 'widgets/AdminTabs/ProductsTab/ProductsTab';
import PromoCodesTab from 'widgets/AdminTabs/PromoCodesTab/PromoCodesTab';
import PurchasesTab from 'widgets/AdminTabs/PurchasesTab/PurchasesTab';
import styles from './AdminPage.module.scss';

const componentByAdminTab: Record<AdminTab, ComponentType> = {
    [AdminTab.PURCHASES]: PurchasesTab,
    [AdminTab.DISCOUNTS]: DiscountsTab,
    [AdminTab.PROMO_CODES]: PromoCodesTab,
    [AdminTab.PRODUCTS]: ProductsTab
};

const AdminPage: FunctionComponent = () => {
    const [activeTab, setActiveTab] = useState<AdminTab>(AdminTab.PRODUCTS);
    const ActiveTabComponent = componentByAdminTab[activeTab];

    return (
        <AdminAccessGuard>
            <div className={styles.wrapper}>
                <Section className={styles.section}>
                    <Spacing size={15} />

                    <AdminNavBar activeTab={activeTab} setActiveTab={setActiveTab} />

                    <Spacing size={15} />

                    <ActiveTabComponent />
                </Section>
            </div>
        </AdminAccessGuard>
    );
};

export default AdminPage;
