import { FunctionComponent, useRef, useState } from 'react';
import { ProductOutDto } from '@/app/types/api/apiTypes';
import chestImage from '@/shared/assets/chest.png';
import { BackgroundColor, FailSafeImage, ModernButton, Optional, SafeHTML, Spacing } from '@/shared/ui';
import minusIcon from './images/minusIcon.svg';
import plusIcon from './images/plusIcon.svg';
import styles from './ProductCard.module.scss';

interface Props {
    product: ProductOutDto;
    amount: number;
    onIncrement(): void;
    onDecrement(): void;
}

/**
 * Компонент карточки продукта. Включает в себя изображение продукта, кнопку "подробнее", название, стоимость
 * и кнопки добавления / удаления продукта в корзину и из неё.
 *
 * При нажатии на кнопку "подробнее" вместо изображения продукта отображает его описание и кнопку "скрыть описание".
 *
 * @param {Props} props - Свойства компонента
 * @param {ProductOutDto} props.product - Количество продукта в корзине
 * @param {number} props.amount - Количество продукта в корзине
 * @param {function} props.onIncrement - Коллбэк, вызываемый при добавлении продукта в корзину / увеличении количества
 * @param {function} props.onDecrement - Коллбэк, вызываемый при уменьшении количества продукта в корзине
 */
export const ProductCard: FunctionComponent<Props> = ({ product, amount, onIncrement, onDecrement }) => {
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    const { name, description, imagePath, priceWithoutDiscount, priceWithDiscount } = product;

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
                    <FailSafeImage
                        className={styles.image}
                        src={imagePath}
                        fallbackSrc={chestImage}
                        onClick={toggleDescriptionVisibility}
                    />
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

                    {amount ? (
                        <div className={styles.amountControlRow}>
                            <ModernButton
                                className={styles.amountControlButton}
                                background={BackgroundColor.RED}
                                onClick={onDecrement}
                            >
                                <img src={minusIcon} alt="Убрать" />
                            </ModernButton>

                            <span className={styles.amount}>{amount}</span>

                            <ModernButton
                                className={styles.amountControlButton}
                                background={BackgroundColor.RED}
                                onClick={onIncrement}
                            >
                                <img src={plusIcon} alt="Добавить" />
                            </ModernButton>
                        </div>
                    ) : (
                        <ModernButton
                            className={styles.buyButton}
                            background={BackgroundColor.RED}
                            onClick={onIncrement}
                        >
                            В корзину
                        </ModernButton>
                    )}
                </div>
            </div>
        </div>
    );
};
