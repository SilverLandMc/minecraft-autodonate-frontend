import { ChangeEvent, FunctionComponent, useState } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import { ActiveSubTab } from 'widgets/AdminTabs/DiscountsTab/DiscountsTab';
import Title from 'shared/ui/Title/Title';
import Button from 'shared/ui/Button/Button';
import Spacing from 'shared/ui/spacing/Spacing';
import { PromoCodeComponentProps } from 'widgets/AdminTabs/PromoCodesTab/PromoCodesTab';
import useDiscountInfo from 'widgets/AdminTabs/PromoCodesTab/hooks/useDiscountInfo';
import createPromoCode from 'widgets/AdminTabs/PromoCodesTab/actions/createPromoCode';
import RunnerLoader from 'shared/ui/RunnerLoader/RunnerLoader';
import AdminErrorBlock from 'shared/ui/AdminErrorBlock/AdminErrorBlock';
import styles from './PromoCodeCreation.module.scss';

const initialFormValues = {
    name: '',
    maxUseCount: 0,
    startDate: '',
    endDate: '',
    discountId: '',
    limitedUse: false
};

const PromoCodeCreation: FunctionComponent<PromoCodeComponentProps> = ({ setActiveSubTab, className }) => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const { discountInfo, isDiscountInfoLoading, discountInfoError } = useDiscountInfo();

    const changeName = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, name: event.target.value });

    const changeDiscountId = (event: ChangeEvent<HTMLSelectElement>) => {
        const discountId = event.target.value;
        setFormValues({ ...formValues, discountId });
    };

    const changeMaxUseCount = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, maxUseCount: Number(event.target.value) });

    const changeIsLimited = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, limitedUse: event.target.checked });

    const changeStartDate = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, startDate: event.target.value });

    const changeEndDate = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, endDate: event.target.value });

    const navigateToPromoCodesList = () => setActiveSubTab(ActiveSubTab.LIST);

    const validateAndCreate = async () => {
        console.log(formValues);
        if (formValues.name.trim().length === 0) {
            setError('Название не должно быть пустым!');
            return;
        }

        if (!formValues.discountId) {
            setError('Выберите скидку!');
            return;
        }

        try {
            setIsProcessing(true);

            await createPromoCode({
                ...formValues,
                startDate: formValues.startDate ? new Date(formValues.startDate).toISOString() : null,
                endDate: formValues.endDate ? new Date(formValues.endDate).toISOString() : null
            });

            navigateToPromoCodesList();
        } catch (error) {
            setError('Ошибка при попытке создания промокода');
        } finally {
            setIsProcessing(false);
        }
    };

    if (isDiscountInfoLoading) {
        return <RunnerLoader />;
    }

    if (discountInfoError) {
        return <AdminErrorBlock text="Ошибка при загрузке данных о скидках" />;
    }

    return (
        <div className={classNames(styles.discountCreation, [className])}>
            <Title>Название:</Title>
            <input type="text" value={formValues.name} onChange={changeName} />

            <Title>Скидка:</Title>
            <select defaultValue="" onChange={changeDiscountId}>
                <option value="">Нажмите здесь, чтобы выбрать скидку</option>
                {discountInfo.map(({ id, description }) => (
                    <option key={id} value={id}>
                        {description}
                    </option>
                ))}
            </select>

            <Title>Максимальное число использований:</Title>
            <input type="number" value={formValues.maxUseCount} onChange={changeMaxUseCount} min={0} />

            <Title>Лимитирован:</Title>
            <input type="checkbox" checked={formValues.limitedUse} onChange={changeIsLimited} />

            <Title>Начало:</Title>
            <input type="datetime-local" value={formValues.startDate} onChange={changeStartDate} />

            <Title>Конец:</Title>
            <input type="datetime-local" value={formValues.endDate} onChange={changeEndDate} />

            <Spacing size={20} />

            <div className={styles.buttonsRowWrapper}>
                <Button onClick={validateAndCreate} disabled={isProcessing}>
                    Создать
                </Button>

                <Button
                    className={styles.navigateBackButton}
                    onClick={navigateToPromoCodesList}
                    disabled={isProcessing}
                >
                    К списку промокодов
                </Button>
            </div>

            <Spacing size={20} />

            {error && (
                <>
                    <div className={styles.error}>{error}</div>
                    <Spacing size={20} />
                </>
            )}
        </div>
    );
};

export default PromoCodeCreation;
