import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import useDiscountInfo from 'shared/hooks/useDiscountInfo';
import classNames from 'shared/lib/aliases/classNames';
import convertTimestampToInputString from 'shared/lib/format/convertTimestampToInputString';
import AdminErrorBlock from 'shared/ui/AdminErrorBlock/AdminErrorBlock';
import Button from 'shared/ui/Button/Button';
import RunnerLoader from 'shared/ui/RunnerLoader/RunnerLoader';
import Spacing from 'shared/ui/spacing/Spacing';
import Title from 'shared/ui/Title/Title';
import { ActiveSubTab } from 'widgets/AdminTabs/DiscountsTab/DiscountsTab';
import editPromoCode from 'widgets/AdminTabs/PromoCodesTab/actions/editPromoCode';
import usePromoCode from 'widgets/AdminTabs/PromoCodesTab/hooks/usePromoCode';
import { PromoCodeComponentProps } from 'widgets/AdminTabs/PromoCodesTab/PromoCodesTab';
import styles from './PromoCodeEditing.module.scss';

const initialFormValues = {
    id: '',
    name: '',
    maxUseCount: 0,
    startDate: '',
    endDate: '',
    discountId: '',
    limitedUse: false
};

const PromoCodeEditing: FunctionComponent<PromoCodeComponentProps> = ({
    setActiveSubTab,
    editingPromoCodeId,
    className
}) => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const { promoCode: initialPromoCode, isLoading, error: loadingError } = usePromoCode(editingPromoCodeId);

    const { discountInfo, isDiscountInfoLoading, discountInfoError } = useDiscountInfo();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        setFormValues({
            id: editingPromoCodeId,
            name: initialPromoCode.name,
            maxUseCount: initialPromoCode?.maxUseCount ?? 0,
            startDate: convertTimestampToInputString(initialPromoCode?.startDate as unknown as number),
            endDate: convertTimestampToInputString(initialPromoCode?.endDate as unknown as number),
            discountId: initialPromoCode?.discount.id,
            limitedUse: initialPromoCode?.limitedUse ?? false
        });
    }, [isLoading, editingPromoCodeId, initialPromoCode]);

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

    const navigateToDiscountsList = () => setActiveSubTab(ActiveSubTab.LIST);

    const validateAndEdit = async () => {
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

            await editPromoCode({
                ...formValues,
                startDate: formValues.startDate ? new Date(formValues.startDate).toISOString() : null,
                endDate: formValues.endDate ? new Date(formValues.endDate).toISOString() : null
            });

            navigateToDiscountsList();
        } catch (error) {
            setError('Ошибка при попытке редактирования промокода');
        } finally {
            setIsProcessing(false);
        }
    };

    if (isDiscountInfoLoading || isLoading) {
        return <RunnerLoader />;
    }

    if (loadingError) {
        return <AdminErrorBlock text="Ошибка при загрузке промокода. Попробуйте обновить страницу" />;
    }

    if (discountInfoError) {
        return <AdminErrorBlock text="Ошибка при загрузке данных о скидках. Попробуйте обновить страницу" />;
    }

    return (
        <div className={classNames(styles.discountCreation, [className])}>
            <Title>Название:</Title>
            <input type="text" value={formValues.name} disabled />

            <Title>Скидка:</Title>
            <select value={formValues.discountId} onChange={changeDiscountId}>
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
                <Button onClick={validateAndEdit} disabled={isProcessing}>
                    Редактировать
                </Button>

                <Button className={styles.navigateBackButton} onClick={navigateToDiscountsList} disabled={isProcessing}>
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

export default PromoCodeEditing;
