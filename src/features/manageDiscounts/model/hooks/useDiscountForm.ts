import { ChangeEvent, useEffect, useState } from 'react';
import { createDiscount, editDiscount, useDiscount } from '@/entities/discount';
import { DiscountInDto, DiscountType } from '@/shared/api/apiTypes';
import { convertTimestampToInputString } from '@/shared/lib/format';

const initialFormValue: DiscountInDto = {
    name: '',
    id: '',
    endDate: '',
    discountType: DiscountType.PERCENTAGE,
    startDate: '',
    discountAmount: 0
};

interface Params {
    productId?: string;
    onFinish(): void;
}

export const useDiscountForm = ({ productId, onFinish }: Params) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [formValues, setFormValues] = useState<DiscountInDto>(initialFormValue);
    const { discount: initialDiscount, isLoading, error: loadingError } = useDiscount(productId);

    const isCreate = !productId;

    useEffect(() => {
        if (isLoading || isCreate) {
            return;
        }

        setFormValues({
            ...initialDiscount,
            name: initialDiscount?.name ?? initialFormValue.name,
            discountType: initialDiscount?.discountType ?? initialFormValue.discountType,
            discountAmount: initialDiscount?.discountAmount ?? initialFormValue.discountAmount,
            startDate: convertTimestampToInputString(initialDiscount?.startDate),
            endDate: convertTimestampToInputString(initialDiscount?.endDate)
        });
    }, [isCreate, isLoading, initialDiscount]);

    const changeName = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, name: event.target.value });

    const changeDiscountType = (event: ChangeEvent<HTMLSelectElement>) =>
        setFormValues({ ...formValues, discountType: event.target.value as DiscountType, discountAmount: 0 });

    const changeStartDate = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, startDate: event.target.value });

    const changeEndDate = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ ...formValues, endDate: event.target.value });

    const changeAmount = (event: ChangeEvent<HTMLInputElement>) => {
        const nextAmount = Number(event.target.value);
        if (formValues.discountType === DiscountType.PERCENTAGE && nextAmount > 100) {
            return;
        }

        setFormValues({ ...formValues, discountAmount: nextAmount });
    };

    const validateAndSend = async () => {
        if (formValues.name.trim().length === 0) {
            setError('Название не должно быть пустым!');
            return;
        }

        if (formValues.discountAmount <= 0) {
            setError('Размер скидки не должен быть равен нулю!');
            return;
        }

        if (!formValues.startDate || !formValues.endDate) {
            setError('Введите дату действия скидки!');
            return;
        }

        try {
            setIsProcessing(true);

            const discountInDto: DiscountInDto = {
                ...formValues,
                startDate: new Date(formValues.startDate).toISOString(),
                endDate: new Date(formValues.endDate).toISOString()
            };

            if (isCreate) {
                await createDiscount(discountInDto);
            } else {
                await editDiscount(discountInDto);
            }

            onFinish();
        } catch (error) {
            setError('Ошибка при попытке создания или редактирования скидки');
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        isLoading,
        loadingError,
        formValues,
        changeName,
        changeAmount,
        changeDiscountType,
        changeStartDate,
        changeEndDate,
        validateAndSend,
        isProcessing,
        error
    };
};
