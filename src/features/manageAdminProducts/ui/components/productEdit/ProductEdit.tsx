import { FunctionComponent } from 'react';
import ReactQuill from 'react-quill';
import { useDiscountInfo } from '@/entities/discount';
import { Category, ValidityPeriod, ValidityType } from '@/shared/api/apiTypes';
import 'react-quill/dist/quill.snow.css';
import { AdminErrorBlock, Button, RunnerLoader, Spacing, Title } from '@/shared/ui';
import { useProductForm } from '../../../model/hooks/useProductForm';
import { ActiveSubTab, ProductComponentProps } from '../../ProductTab';
import { AdminImageUpload } from '../adminImageUpload/AdminImageUpload';
import styles from './ProductEdit.module.scss';

export const ProductEdit: FunctionComponent<ProductComponentProps> = ({ editingProductId, setActiveSubTab }) => {
    const { discountInfo, isDiscountInfoLoading, discountInfoError } = useDiscountInfo();

    const navigateToProductsList = () => setActiveSubTab(ActiveSubTab.LIST);

    const {
        isProductListLoading,
        error,
        formValues,
        changeName,
        changeDescription,
        changePrice,
        changeImageId,
        initialProduct,
        changePreviousProductId,
        productListInfo,
        changeQuantity,
        changeValidityPeriod,
        changeValidityType,
        changeDiscountId,
        changeOrder,
        changeIsSinglePurchase,
        validateAndSend,
        isProcessing,
        errorText,
        changeCategory,
        productListFetchError
    } = useProductForm({ productId: editingProductId, onFinish: navigateToProductsList });

    if (isDiscountInfoLoading || isProductListLoading) {
        return <RunnerLoader />;
    }

    if (error) {
        return <AdminErrorBlock text="Ошибка загрузки продукта" />;
    }

    return (
        <div key={formValues.id} className={styles.productCreation}>
            <Title>Название:</Title>
            <input type="text" value={formValues.name} onChange={changeName} />

            <Title>Описание:</Title>
            <ReactQuill theme="snow" value={formValues.description ?? ''} onChange={changeDescription} />

            <Title>Стоимость, руб.:</Title>
            <input type="number" value={formValues.price} onChange={changePrice} min={0} />

            <AdminImageUpload setImageId={changeImageId} initialImageSrc={initialProduct?.imagePath ?? undefined} />

            <Title>ID предудыщего продукта для акции "Доплата":</Title>
            <select value={formValues.previousProductForTopUpId ?? undefined} onChange={changePreviousProductId}>
                <option value="">Нажмите здесь, чтобы выбрать предыдущий продукт для акции "Доплата"</option>
                {productListInfo?.map(({ id, description }) => (
                    <option key={id} value={id}>
                        {description}
                    </option>
                ))}
            </select>

            <Title>Количество, шт.:</Title>
            <input type="number" value={formValues.quantity} onChange={changeQuantity} min={0} />

            <Title>Категория:</Title>
            <select value={formValues.category} onChange={changeCategory}>
                <option value={Category.RANKS}>Ранги</option>
                <option value={Category.BOOSTERS}>Бустеры</option>
                <option value={Category.CASES}>Сундуки</option>
                <option value={Category.RESOURCES}>Ресурсы</option>
                <option value={Category.OTHER}>Прочее</option>
            </select>

            <Title>Категория длительности:</Title>
            <select value={formValues.validityType} onChange={changeValidityType}>
                <option value={ValidityType.PERMANENT}>Постоянный</option>
                <option value={ValidityType.TEMPORARY}>Временный</option>
            </select>

            <Title>Длительность продукта:</Title>
            <select value={formValues.validityPeriod} onChange={changeValidityPeriod}>
                <option value={ValidityPeriod.LIFE_TIME}>Постоянный</option>
                <option value={ValidityPeriod.MONTHLY}>Месяц</option>
            </select>

            <Title>Скидка:</Title>
            <select value={formValues.discountId ?? undefined} onChange={changeDiscountId}>
                {discountInfo?.map(({ id, description }) => (
                    <option key={id} value={id}>
                        {description}
                    </option>
                ))}
            </select>

            <Title>Порядок для сортировки в выдаче:</Title>
            <input type="number" value={formValues.order} onChange={changeOrder} />

            <Title>Единичная покупка:</Title>
            <input type="checkbox" checked={formValues.isSinglePurchase} onChange={changeIsSinglePurchase} />

            <Spacing size={20} />

            <div className={styles.buttonsRowWrapper}>
                <Button onClick={validateAndSend} disabled={isProcessing}>
                    Сохранить
                </Button>

                <Button className={styles.navigateBackButton} onClick={navigateToProductsList} disabled={isProcessing}>
                    К списку продуктов
                </Button>
            </div>

            <Spacing size={20} />

            {errorText && (
                <>
                    <div className={styles.error}>{errorText}</div>
                    <Spacing size={20} />
                </>
            )}

            {productListFetchError && <AdminErrorBlock text="Ошибка при загрузке списка продуктов" />}

            {discountInfoError && <AdminErrorBlock text="Ошибка при загрузке списка скидок" />}
        </div>
    );
};
