import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { acceptImageSetting } from '@/shared/const/enum/imageType';
import validateIsFileImage from '@/shared/lib/validation/validateIsFileImage';
import { BackgroundColor, ModernButton, Spacing } from '@/shared/ui';
import Title from '@/shared/ui/title/Title';
import uploadFile from '../../actions/uploadFile';
import styles from './AdminImageUpload.module.scss';

interface Props {
    setImageId(imageId?: string): void;
    initialImageSrc?: string;
}

const AdminImageUpload: FunctionComponent<Props> = ({ setImageId, initialImageSrc }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (!initialImageSrc) {
            return;
        }

        setImageSrc(initialImageSrc);
    }, [initialImageSrc]);

    const hasImage = Boolean(imageSrc);

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

    return (
        <>
            <Title>Картинка:</Title>

            <Spacing size={15} />

            {hasImage && (
                <>
                    <img src={imageSrc} className={styles.image} alt="Загружаемое изображение" />
                    <Spacing size={15} />
                </>
            )}

            <div className={styles.buttonsRow}>
                <input type="file" accept={acceptImageSetting} onChange={handleChangeImage} disabled={isProcessing} />

                {hasImage && (
                    <ModernButton background={BackgroundColor.RED} onClick={deleteImage} disabled={isProcessing}>
                        Удалить изображение
                    </ModernButton>
                )}
            </div>

            {Boolean(error) && (
                <>
                    <Spacing size={10} />
                    <span className={styles.error}>{error}</span>
                </>
            )}
        </>
    );
};

export default AdminImageUpload;
