import { ChangeEvent, useEffect, useState } from 'react';
import { useDiscountInfo } from '@/entities/discount';
import { usePromoCode } from '@/entities/promocode';
import { editPromoCode } from '@/entities/promocode';
import { createPromoCode } from '@/entities/promocode';
import { PromocodeUpdateDto } from '@/shared/api/apiTypes';
import convertTimestampToInputString from '@/shared/lib/format/convertTimestampToInputString';

interface FormValues extends PromocodeUpdateDto {
    name: string;
}

const initialFormValues: FormValues = {
    id: '',
    name: '',
    maxUseCount: 0,
    startDate: '',
    endDate: '',
    discountId: '',
    isLimitedUse: false
};

interface Params {
    promocodeId?: string;
    onFinish(): void;
}

export const usePromocodeForm = ({ promocodeId, onFinish }: Params) => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const { promoCode: initialPromoCode, isLoading, error: loadingError } = usePromoCode(promocodeId);

    const { discountInfo, isDiscountInfoLoading, discountInfoError } = useDiscountInfo();

    const isCreate = !promocodeId;

    useEffect(() => {
        if (isCreate || isLoading) {
            return;
        }

        setFormValues({
            id: promocodeId ?? initialFormValues.id,
            name: initialPromoCode?.name ?? initialFormValues.name,
            maxUseCount: initialPromoCode?.maxUseCount ?? 0,
            startDate: convertTimestampToInputString(initialPromoCode?.startDate as unknown as number),
            endDate: convertTimestampToInputString(initialPromoCode?.endDate as unknown as number),
            discountId: initialPromoCode?.discount?.id ?? initialFormValues.discountId,
            isLimitedUse: initialPromoCode?.isLimitedUse ?? initialFormValues.isLimitedUse
        });
    }, [isCreate, isLoading, promocodeId, initialPromoCode]);

    const changeName = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, name: event.target.value });

    const changeDiscountId = (event: ChangeEvent<HTMLSelectElement>) => {
        const discountId = event.target.value;
        setFormValues({ ...formValues, discountId });
    };

    const changeMaxUseCount = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, maxUseCount: Number(event.target.value) });

    const changeIsLimited = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, isLimitedUse: event.target.checked });

    const changeStartDate = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, startDate: event.target.value });

    const changeEndDate = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, endDate: event.target.value });

    const validateAndSend = async () => {
        if (formValues.name.trim().length === 0) {
            setError('Название не должно быть пустым!');
            return;
        }

        if (!formValues.discountId) {
            setError('Выберите скидку!');
            return;
        }

        if (!formValues.startDate || !formValues.endDate) {
            setError('Выберите даты!');
            return;
        }

        try {
            setIsProcessing(true);

            const promoCodeDto: FormValues = {
                ...formValues,
                startDate: new Date(formValues.startDate).toISOString(),
                endDate: new Date(formValues.endDate).toISOString()
            };

            if (isCreate) {
                await createPromoCode(promoCodeDto);
            } else {
                await editPromoCode(promoCodeDto);
            }

            onFinish();
        } catch (error) {
            setError('Ошибка при попытке редактирования промокода');
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        isDiscountInfoLoading,
        isLoading,
        discountInfo,
        loadingError,
        discountInfoError,
        formValues,
        changeName,
        changeMaxUseCount,
        changeIsLimited,
        changeStartDate,
        changeEndDate,
        changeDiscountId,
        validateAndSend,
        isProcessing,
        error
    };
};
