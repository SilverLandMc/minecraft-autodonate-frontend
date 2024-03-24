import { ComponentType, FunctionComponent, useState } from 'react';
import Section from 'shared/ui/Section/Section';
import AdminAccessGuard from 'pages/AdminPage/layouts/AdminAccessGuard';
import AdminNavBar, { AdminTab } from 'widgets/AdminNavBar/AdminNavBar';
import Spacing from 'shared/ui/spacing/Spacing';
import styles from './AdminPage.module.scss';
import PurchasesTab from 'widgets/AdminTabs/PurchasesTab/PurchasesTab';
import DiscountsTab from 'widgets/AdminTabs/DiscountsTab/DiscountsTab';
import PromoCodesTab from 'widgets/AdminTabs/PromoCodesTab/PromoCodesTab';
import ProductsTab from 'widgets/AdminTabs/ProductsTab/ProductsTab';

const componentByAdminTab: Record<AdminTab, ComponentType> = {
    [AdminTab.PURCHASES]: PurchasesTab,
    [AdminTab.DISCOUNTS]: DiscountsTab,
    [AdminTab.PROMO_CODES]: PromoCodesTab,
    [AdminTab.PRODUCTS]: ProductsTab
};

const AdminPage: FunctionComponent = () => {
    const [activeTab, setActiveTab] = useState<AdminTab>(AdminTab.PURCHASES);
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
