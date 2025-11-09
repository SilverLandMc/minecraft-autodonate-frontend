import { FunctionComponent } from 'react';
import { acceptImageSetting } from '@/shared/const/enum/imageType';
import { BackgroundColor, ModernButton, Spacing, Title } from '@/shared/ui';
import { useImageUpload } from '../../../model/hooks/useImageUpload';
import styles from './AdminImageUpload.module.scss';

interface Props {
    setImageId(imageId?: string): void;
    initialImageSrc?: string;
}

export const AdminImageUpload: FunctionComponent<Props> = ({ setImageId, initialImageSrc }) => {
    const { imageSrc, handleChangeImage, isProcessing, deleteImage, error } = useImageUpload({
        setImageId,
        initialImageSrc
    });

    const hasImage = Boolean(imageSrc);

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
