import { ChangeEvent, useEffect, useState } from 'react';
import { createProduct, editProduct, useProduct, useProductList } from '@/entities/adminProduct';
import { Category, ProductEditInDto, ValidityPeriod, ValidityType } from '@/shared/api/apiTypes';
import { ProductCategory } from '@/shared/enums/ProductCategory';

const PREVIOUS_PRODUCT_SELECT_DESCRIPTION_LENGTH = 42;

const initialFormValues: ProductEditInDto = {
    id: '',
    name: '',
    description: '',
    price: 0,
    imageId: '',
    previousProductForTopUpId: '',
    quantity: 0,
    category: Category.RANKS,
    validityType: ValidityType.PERMANENT,
    validityPeriod: ValidityPeriod.LIFE_TIME,
    discountId: '',
    order: 0,
    isSinglePurchase: false
};

interface Params {
    productId?: string;
    onFinish(): void;
}

export const useProductForm = ({ productId, onFinish }: Params) => {
    const { product: initialProduct, isLoading, error } = useProduct(productId);

    const [isProcessing, setIsProcessing] = useState(false);
    const [formValues, setFormValues] = useState<ProductEditInDto>(initialFormValues);
    const [errorText, setErrorText] = useState<string>();

    const {
        productList,
        isLoading: isProductListLoading,
        error: productListFetchError
    } = useProductList({ productCategory: formValues.category.toLowerCase() as ProductCategory });

    const productListInfo = productList?.map(({ id, description, priceWithoutDiscount, name }) => ({
        id,
        description: `${name}. ${description?.slice(0, PREVIOUS_PRODUCT_SELECT_DESCRIPTION_LENGTH)}... (${priceWithoutDiscount} руб.)`
    }));

    const isCreate = !productId;

    useEffect(() => {
        if (isCreate || isLoading) {
            return;
        }

        setIsProcessing(true);

        setFormValues({
            id: productId ?? '',
            name: initialProduct?.name ?? initialFormValues.name,
            description: initialProduct?.description ?? initialFormValues.description,
            price: initialProduct?.priceWithoutDiscount ?? initialFormValues.price,
            imageId: initialProduct?.imageId ?? initialFormValues.imageId,
            previousProductForTopUpId:
                initialProduct?.previousProductForTopUpId ?? initialFormValues.previousProductForTopUpId,
            quantity: initialProduct?.quantity ?? initialFormValues.quantity,
            category: initialProduct?.category ?? initialFormValues.category,
            validityType: initialProduct?.validityType ?? initialFormValues.validityType,
            validityPeriod: initialProduct?.validityPeriod ?? initialFormValues.validityPeriod,
            discountId: initialProduct?.discount?.id ?? initialFormValues.discountId,
            order: initialProduct?.order ?? initialFormValues.order,
            isSinglePurchase: initialProduct?.isSinglePurchase ?? initialFormValues.isSinglePurchase
        });

        setIsProcessing(false);
    }, [isCreate, isLoading, productId, initialProduct]);

    const changeName = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, name: event.target.value });

    const changeDescription = (value: string) => setFormValues({ ...formValues, description: value });

    const changePrice = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, price: Number(event.target.value) });

    const changeImageId = (imageId: string) => setFormValues({ ...formValues, imageId });

    const changePreviousProductId = (event: ChangeEvent<HTMLSelectElement>) =>
        setFormValues({ ...formValues, previousProductForTopUpId: event.target.value });

    const changeQuantity = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, quantity: Number(event.target.value) });

    const changeCategory = (event: ChangeEvent<HTMLSelectElement>) =>
        setFormValues({ ...formValues, category: event.target.value as Category });

    const changeValidityType = (event: ChangeEvent<HTMLSelectElement>) =>
        setFormValues({ ...formValues, validityType: event.target.value as ValidityType });

    const changeValidityPeriod = (event: ChangeEvent<HTMLSelectElement>) =>
        setFormValues({ ...formValues, validityPeriod: event.target.value as ValidityPeriod });

    const changeDiscountId = (event: ChangeEvent<HTMLSelectElement>) =>
        setFormValues({ ...formValues, discountId: event.target.value });

    const changeOrder = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, order: Number(event.target.value) });

    const changeIsSinglePurchase = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, isSinglePurchase: event.target.checked });

    const validateAndSend = async () => {
        if (!formValues.name) {
            setErrorText('Введите название');
            return;
        }

        if (!formValues.price) {
            setErrorText('Введите стоимость');
            return;
        }

        if (!formValues.quantity) {
            setErrorText('Введите количество');
            return;
        }

        try {
            setIsProcessing(true);

            if (isCreate) {
                const { id, ...createDto } = formValues;
                await createProduct(createDto);
            } else {
                await editProduct(formValues);
            }

            setIsProcessing(false);

            onFinish();
        } catch (error) {
            setErrorText('Ошибка при редактировании продукта');
        }
    };

    return {
        isProductListLoading,
        error,
        formValues,
        changeName,
        changeDescription,
        changePrice,
        changeImageId,
        initialProduct,
        changePreviousProductId,
        changeCategory,
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
        productListFetchError
    };
};
