import { ChangeEvent, useEffect, useState } from 'react';
import { uploadFile } from '@/entities/adminProduct';
import { acceptImageSetting } from '@/shared/enums/imageType';
import { validateIsFileImage } from '@/shared/lib/validation';

interface Params {
    setImageId(imageId?: string): void;
    initialImageSrc?: string;
}

export const useImageUpload = ({ setImageId, initialImageSrc }: Params) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (!initialImageSrc) {
            return;
        }

        setImageSrc(initialImageSrc);
    }, [initialImageSrc]);

    const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : undefined;

        if (!file) {
            return;
        }

        if (!validateIsFileImage(file)) {
            setError(`Некорректный тип файла. Разрешены только картинки форматов ${acceptImageSetting}`);
            return;
        }

        setIsProcessing(true);

        try {
            const imageId = await uploadFile(file);
            setImageId(imageId);
            // eslint-disable-next-line compat/compat
            setImageSrc(URL.createObjectURL(file));
            setError(undefined);
        } catch (error) {
            setError('Не удалось загрузить файл на сервер');
            setImageId(undefined);
            setImageSrc(undefined);
        } finally {
            setIsProcessing(false);
        }
    };

    const deleteImage = () => {
        setImageSrc(undefined);
        setImageId(undefined);
    };

    return { imageSrc, handleChangeImage, isProcessing, deleteImage, error };
};
