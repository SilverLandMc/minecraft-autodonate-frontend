import { ComponentType, FunctionComponent, useState } from 'react';
import { AdminNavBar, AdminTab } from '@/widgets/adminNavBar/AdminNavBar';
import { DiscountsTab } from '@/widgets/adminTabs/discountTab/DiscountsTab';
import { ProductsTab } from '@/widgets/adminTabs/productTab/ProductsTab';
import { PromoCodesTab } from '@/widgets/adminTabs/promoCodeTab/PromoCodesTab';
import { PurchasesTab } from '@/widgets/adminTabs/purchaseTab/PurchasesTab';
import { Section, Spacing } from '@/shared/ui';
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
        <div className={styles.wrapper}>
            <Section className={styles.section}>
                <Spacing size={15} />

                <AdminNavBar activeTab={activeTab} setActiveTab={setActiveTab} />

                <Spacing size={15} />

                <ActiveTabComponent />
            </Section>
        </div>
    );
};

export default AdminPage;
