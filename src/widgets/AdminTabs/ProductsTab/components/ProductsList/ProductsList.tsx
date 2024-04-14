import React, { FunctionComponent, useState } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './ProductsList.module.scss';
import { ProductCategory } from 'app/const/enum/ProductCategory';
import { ProductComponentProps } from 'widgets/AdminTabs/ProductsTab/ProductsTab';
import useProductList from 'widgets/AdminTabs/ProductsTab/hooks/useProductList';
import RunnerLoader from 'shared/ui/RunnerLoader/RunnerLoader';
import AdminErrorBlock from 'shared/ui/AdminErrorBlock/AdminErrorBlock';
import Table from 'shared/ui/Table/Table';
import { ValidityType } from 'app/types/api/apiTypes';
import deleteProduct from 'widgets/AdminTabs/ProductsTab/actions/deleteProduct';
import { ActiveSubTab } from 'widgets/AdminTabs/DiscountsTab/DiscountsTab';
import useAppDispatch from 'shared/hooks/redux/useAppDispatch';
import { resetCategoriesLoaded } from 'pages/ShopPage/slices/shopPageSlice';
import Spacing from 'shared/ui/spacing/Spacing';
import Button from 'shared/ui/Button/Button';
import SafelySetInnerHTML from 'shared/ui/SafelySetInnerHTML/SafelySetInnerHTML';

const titleByCategoryMap: Record<ProductCategory, string> = {
    [ProductCategory.RANKS]: 'Ранги',
    [ProductCategory.BOOSTERS]: 'Бустеры',
    [ProductCategory.CASES]: 'Сундуки',
    [ProductCategory.RESOURCES]: 'Ресурсы',
    [ProductCategory.OTHER]: 'Прочее'
};

const ProductsList: FunctionComponent<ProductComponentProps> = ({
    setEditingProductId,
    setActiveSubTab,
    className
}) => {
    const dispatch = useAppDispatch();
    const [activeProductCategory, setActiveProductCategory] = useState<ProductCategory>(ProductCategory.RANKS);
    const [reFetchFlag, setReFetchFlag] = useState(false);

    const { productList, isLoading, error } = useProductList({ productCategory: activeProductCategory, reFetchFlag });
    const changeCategory = (category: ProductCategory) => () => setActiveProductCategory(category);

    const navigateToCreation = () => setActiveSubTab(ActiveSubTab.CREATION);

    const handleEditClick = (id: string) => () => {
        setEditingProductId(id);
        setActiveSubTab(ActiveSubTab.EDITING);
    };

    const handleDelete = (id: string) => async () => {
        try {
            await deleteProduct(id);
            setReFetchFlag(!reFetchFlag);
            dispatch(resetCategoriesLoaded());
        } catch (error) {
            alert('Ошибка при удалении продукта!');
        }
    };

    if (isLoading) {
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
                    render: (rawHTML: string) => <SafelySetInnerHTML rawHTML={rawHTML} />
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
        <div className={classNames(styles.productsList, [className])}>
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

            <Button onClick={navigateToCreation}>Создать продукт</Button>

            <Spacing size={20} />
        </div>
    );
};

export default ProductsList;
