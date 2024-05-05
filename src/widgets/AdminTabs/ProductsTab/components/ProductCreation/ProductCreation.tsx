import { ChangeEvent, FunctionComponent, useState } from 'react';
import { ActiveSubTab, ProductComponentProps } from 'widgets/AdminTabs/ProductsTab/ProductsTab';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Category, ProductCreateInDto, ValidityPeriod, ValidityType } from 'app/types/api/apiTypes';
import createProduct from 'widgets/AdminTabs/ProductsTab/actions/createProduct';
import Title from 'shared/ui/Title/Title';
import Spacing from 'shared/ui/spacing/Spacing';
import Button from 'shared/ui/Button/Button';
import AdminImageUpload from 'widgets/AdminTabs/ProductsTab/components/AdminImageUpload/AdminImageUpload';
import useAppDispatch from 'shared/hooks/redux/useAppDispatch';
import { resetCategoriesLoaded } from 'pages/ShopPage/slices/shopPageSlice';
import useDiscountInfo from 'shared/hooks/useDiscountInfo';
import RunnerLoader from 'shared/ui/RunnerLoader/RunnerLoader';
import useProductList from 'widgets/AdminTabs/ProductsTab/hooks/useProductList';
import { ProductCategory } from 'app/const/enum/ProductCategory';
import AdminErrorBlock from 'shared/ui/AdminErrorBlock/AdminErrorBlock';
import styles from './ProductCreation.module.scss';

const PREVIOUS_PRODUCT_SELECT_DESCRIPTION_LENGTH = 42;

const initialFormValues: ProductCreateInDto = {
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
    singlePurchase: false
};

const ProductCreation: FunctionComponent<ProductComponentProps> = ({ setActiveSubTab }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [formValues, setFormValues] = useState<ProductCreateInDto>(initialFormValues);
    const [errorText, setErrorText] = useState<string>();

    const {
        productList,
        isLoading: isProductListLoading,
        error: productListFetchError
    } = useProductList({ productCategory: formValues.category.toLowerCase() as ProductCategory });
    const productListInfo = productList?.map(({ id, description, priceWithoutDiscount, name }) => ({
        id,
        description: `${name}. ${description.slice(0, PREVIOUS_PRODUCT_SELECT_DESCRIPTION_LENGTH)}... (${priceWithoutDiscount} руб.)`
    }));

    const dispatch = useAppDispatch();

    const { discountInfo, isDiscountInfoLoading, discountInfoError } = useDiscountInfo();

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
        setFormValues({ ...formValues, singlePurchase: event.target.checked });

    const navigateToProductsList = () => setActiveSubTab(ActiveSubTab.LIST);

    const validateAndCreate = async () => {
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
            await createProduct(formValues);
            dispatch(resetCategoriesLoaded());
            setIsProcessing(false);
            navigateToProductsList();
        } catch (error) {
            setErrorText('Ошибка при создании продукта');
        }
    };

    if (isDiscountInfoLoading || isProductListLoading) {
        return <RunnerLoader />;
    }

    return (
        <div className={styles.productCreation}>
            <Title>Название:</Title>
            <input type="text" value={formValues.name} onChange={changeName} />

            <Title>Описание:</Title>
            <ReactQuill theme="snow" value={formValues.description} onChange={changeDescription} />

            <Title>Стоимость, руб.:</Title>
            <input type="number" value={formValues.price} onChange={changePrice} min={0} />

            <AdminImageUpload setImageId={changeImageId} />

            <Title>ID предудыщего продукта для акции "Доплата":</Title>
            <select defaultValue="" onChange={changePreviousProductId}>
                <option value="">Нажмите здесь, чтобы выбрать предыдущий продукт для акции "Доплата"</option>
                {productListInfo.map(({ id, description }) => (
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
            <select defaultValue="" onChange={changeDiscountId}>
                <option value="">Нажмите здесь, чтобы выбрать скидку</option>
                {discountInfo.map(({ id, description }) => (
                    <option key={id} value={id}>
                        {description}
                    </option>
                ))}
            </select>

            <Title>Порядок для сортировки в выдаче:</Title>
            <input type="number" value={formValues.order} onChange={changeOrder} />

            <Title>Единичная покупка:</Title>
            <input type="checkbox" checked={formValues.singlePurchase} onChange={changeIsSinglePurchase} />

            <Spacing size={20} />

            <div className={styles.buttonsRowWrapper}>
                <Button onClick={validateAndCreate} disabled={isProcessing}>
                    Создать
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

            {productListFetchError && <AdminErrorBlock text={'Ошибка при загрузке списка продуктов'} />}

            {discountInfoError && <AdminErrorBlock text={'Ошибка при загрузке списка скидок'} />}
        </div>
    );
};

export default ProductCreation;
