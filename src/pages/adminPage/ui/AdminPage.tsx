import { ComponentType, FunctionComponent, useState } from 'react';
import { AdminNavBar, AdminTab } from '@/widgets/adminNavBar';
import { ProductTab } from '@/features/manageAdminProducts';
import { DiscountsTab } from '@/features/manageDiscounts';
import { PromoCodesTab } from '@/features/managePromocodes';
import { PurchaseTab } from '@/features/managePurchases';
import { Section, Spacing } from '@/shared/ui';
import styles from './AdminPage.module.scss';

const componentByAdminTab: Record<AdminTab, ComponentType> = {
    [AdminTab.PURCHASES]: PurchaseTab,
    [AdminTab.DISCOUNTS]: DiscountsTab,
    [AdminTab.PROMO_CODES]: PromoCodesTab,
    [AdminTab.PRODUCTS]: ProductTab
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
