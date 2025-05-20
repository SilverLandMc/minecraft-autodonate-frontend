import { FunctionComponent, useRef, useState } from 'react';
import { ProductOutDto } from '@/app/types/api/apiTypes';
import chestImage from '@/shared/assets/chest.png';
import { BackgroundColor, FailSafeImage, ModernButton, Optional, SafeHTML, Spacing } from '@/shared/ui';
import styles from './ProductCard.module.scss';

interface Props {
    product: ProductOutDto;
    onIncrement(): void;
    onDecrement(): void;
}

export const ProductCard: FunctionComponent<Props> = ({ product, onIncrement, onDecrement }) => {
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    const { id, name, description, imagePath, priceWithoutDiscount, priceWithDiscount } = product;

    const cardRef = useRef<HTMLDivElement>(null);

    const toggleDescriptionVisibility = () => {
        setIsDescriptionVisible(!isDescriptionVisible);
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div className={styles.card} ref={cardRef}>
            <div>
                {isDescriptionVisible ? (
                    <SafeHTML rawHTML={description} />
                ) : (
                    <FailSafeImage className={styles.image} src={imagePath} fallbackSrc={chestImage} />
                )}

                <Spacing size={12} />
            </div>

            <div>
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
        </div>
    );
};
