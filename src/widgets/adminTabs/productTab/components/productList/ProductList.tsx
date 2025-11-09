import { FunctionComponent, useState } from 'react';
import { ValidityType } from '@/shared/api/apiTypes';
import { ProductCategory } from '@/shared/enums/ProductCategory';
import classNames from '@/shared/lib/aliases/classNames';
import { BackgroundColor, ModernButton, Spacing } from '@/shared/ui';
import AdminErrorBlock from '@/shared/ui/adminErrorBlock/AdminErrorBlock';
import { RunnerLoader } from '@/shared/ui/runnerLoader';
import { SafeHTML } from '@/shared/ui/safeHTML';
import Table from '@/shared/ui/table/Table';
import { deleteProduct } from '../../actions/deleteProduct';
import { useProductList } from '../../hooks/useProductList';
import { ActiveSubTab, ProductComponentProps } from '../../ProductTab';
import styles from './ProductList.module.scss';

const titleByCategoryMap: Record<ProductCategory, string> = {
    [ProductCategory.RANKS]: 'Ранги',
    [ProductCategory.BOOSTERS]: 'Бустеры',
    [ProductCategory.CASES]: 'Сундуки',
    [ProductCategory.RESOURCES]: 'Ресурсы',
    [ProductCategory.OTHER]: 'Прочее'
};

export const ProductList: FunctionComponent<ProductComponentProps> = ({ setEditingProductId, setActiveSubTab }) => {
    const [activeProductCategory, setActiveProductCategory] = useState<ProductCategory>(ProductCategory.RANKS);
    const [reFetchFlag, setReFetchFlag] = useState(false);

    const { productList, isLoading, error } = useProductList({ productCategory: activeProductCategory, reFetchFlag });
    const changeCategory = (category: ProductCategory) => () => setActiveProductCategory(category);

    const navigateToCreation = () => setActiveSubTab(ActiveSubTab.EDIT);

    const handleEditClick = (id: string) => () => {
        setEditingProductId?.(id);
        setActiveSubTab(ActiveSubTab.EDIT);
    };

    const handleDelete = (id: string) => async () => {
        try {
            await deleteProduct(id);
            setReFetchFlag(!reFetchFlag);
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert('Ошибка при удалении продукта!');
        }
    };

    if (isLoading || !productList) {
        return <RunnerLoader />;
    }

    if (error) {
        return <AdminErrorBlock text="Ошибка при загрузке товаров категории. Попробуйте перезагрузить страницу" />;
    }

    const productsTable = (
        <Table
            gridTemplateColumns="100px 1fr 80px 80px 100px 100px 100px"
            columnNames={[
                'Название',
                'Описание',
                '₽ без скидки',
                '₽ со скидкой',
                'Временный',
                'Единоразовый',
                'Действия'
            ]}
            items={productList}
            renderProps={[
                { firstFieldName: 'name' },
                {
                    firstFieldName: 'description',
                    render: (rawHTML: string) => <SafeHTML rawHTML={rawHTML} />
                },
                { firstFieldName: 'priceWithoutDiscount' },
                { firstFieldName: 'priceWithDiscount' },
                {
                    firstFieldName: 'validityType',
                    render: (validityType: ValidityType) => (validityType === ValidityType.TEMPORARY ? 'Да' : 'Нет')
                },
                {
                    firstFieldName: 'singlePurchase',
                    render: (isSinglePurchase: boolean) => (isSinglePurchase ? 'Да' : 'Нет')
                },
                {
                    firstFieldName: 'id',
                    render: (id: string) => (
                        <div className={styles.actionsWrapper}>
                            <div className={styles.actionIcon} onClick={handleEditClick(id)}>
                                ✏️
                            </div>

                            <div className={styles.actionIcon} onClick={handleDelete(id)}>
                                🗑️
                            </div>
                        </div>
                    )
                }
            ]}
        />
    );

    return (
        <div className={styles.productsList}>
            <div className={styles.categoryBar}>
                {Object.values(ProductCategory).map((productCategory) => (
                    <span
                        key={productCategory}
                        className={classNames(styles.tab, {
                            [styles.active]: productCategory === activeProductCategory
                        })}
                        onClick={changeCategory(productCategory)}
                    >
                        {titleByCategoryMap[productCategory]}
                    </span>
                ))}
            </div>

            {productList.length > 0 ? (
                productsTable
            ) : (
                <span className={styles.noProducts}>В данной категории нет продуктов</span>
            )}

            <Spacing size={20} />

            <ModernButton background={BackgroundColor.GREEN} onClick={navigateToCreation}>
                Создать продукт
            </ModernButton>

            <Spacing size={20} />
        </div>
    );
};
