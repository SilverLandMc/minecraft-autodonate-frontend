import { FunctionComponent, useState } from 'react';
import Spacing from 'shared/ui/spacing/Spacing';
import { ProductOutDto } from '@/app/types/api/apiTypes';
import chestImage from '@/shared/assets/chest.png';
import { BackgroundColor, FailSafeImage, ModernButton, Optional } from '@/shared/ui';
import styles from './ProductCard.module.scss';

interface Props {
    product: ProductOutDto;
}

export const ProductCard: FunctionComponent<Props> = ({ product }) => {
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    const { id, name, description, imagePath, priceWithoutDiscount, priceWithDiscount } = product;

    const toggleDescriptionVisibility = () => setIsDescriptionVisible(!isDescriptionVisible);

    return (
        <div className={styles.card}>
            <div>
                <FailSafeImage className={styles.image} src={imagePath} fallbackSrc={chestImage} />

                <Spacing size={12} />

                <ModernButton
                    className={styles.descriptionButton}
                    background={BackgroundColor.BLACK}
                    onClick={toggleDescriptionVisibility}
                >
                    {isDescriptionVisible ? 'Скрыть описание' : 'Подробнее'}
                </ModernButton>

                <Spacing size={20} />

                <h3 className={styles.name}>{name}</h3>

                <Spacing size={24} />
            </div>

            <div className={styles.pricesBuyRow}>
                <div className={styles.prices}>
                    <span className={priceWithDiscount ? styles.priceWithoutDiscount : styles.priceWithDiscount}>
                        {priceWithoutDiscount} руб.
                    </span>

                    <Optional visible={Boolean(priceWithDiscount)}>
                        <span className={styles.priceWithDiscount}>{priceWithDiscount} руб.</span>
                    </Optional>
                </div>

                <ModernButton className={styles.buyButton} background={BackgroundColor.RED}>
                    В корзину
                </ModernButton>
            </div>
        </div>
    );
};
