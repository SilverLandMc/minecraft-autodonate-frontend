import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import Title from 'shared/ui/Title/Title';
import validateIsFileImage from 'shared/lib/validation/validateIsFileImage';
import Spacing from 'shared/ui/spacing/Spacing';
import { acceptImageSetting } from 'shared/const/enum/imageType';
import styles from './AdminImageUpload.module.scss';
import uploadFile from 'widgets/AdminTabs/ProductsTab/actions/uploadFile';
import Button from 'shared/ui/Button/Button';

interface Props {
    setImageId(imageId: string): void;
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
        const file = event.target.files[0];

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
                    <Button className={styles.deleteButton} onClick={deleteImage} disabled={isProcessing}>
                        Удалить изображение
                    </Button>
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
