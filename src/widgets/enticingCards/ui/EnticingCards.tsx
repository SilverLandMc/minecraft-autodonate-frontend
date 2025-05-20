import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundColor, ModernButton, ModernButtonProps } from 'shared/ui';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { Section } from '@/shared/ui';
import chestImage from './images/chest.png';
import potionImage from './images/potion.png';
import succubusImage from './images/succubus.png';
import styles from './EnticingCards.module.scss';

const ShoppingButton: FunctionComponent<Pick<ModernButtonProps, 'background'>> = ({ background }) => {
    const navigate = useNavigate();
    const navigateToShop = () => navigate(RoutePath.shop);

    return (
        <ModernButton className={styles.button} background={background} onClick={navigateToShop}>
            Перейти в магазин
        </ModernButton>
    );
};

/**
 * Блок с карточками категорий товаров, ведущих на страницу магазина.
 * Каждая из кнопок в составе карточек ведёт в магазин (`RoutePath.shop`).
 * Поскольку кнопки одинаковы (помимо цвета фона), над компонентом определён переиспользуемый локальный компонент `ShoppingButton`.
 *
 * @component
 */
export const EnticingCards: FunctionComponent = () => (
    <Section className={styles.wrapper}>
        <div className={styles.ranksCard}>
            <h3 className={styles.title}>Ранги</h3>
            <ShoppingButton background={BackgroundColor.MAGENTA} />
            <img className={styles.succubusImage} src={succubusImage} alt="Ранги" />
        </div>

        <div className={styles.boostersCard}>
            <h3 className={styles.title}>Бустеры</h3>
            <ShoppingButton background={BackgroundColor.GREEN} />
            <img className={styles.potionImage} src={potionImage} alt="Бустеры" />
        </div>

        <div className={styles.resourcesCard}>
            <h3 className={styles.title}>Ресурсы</h3>
            <ShoppingButton background={BackgroundColor.ORANGE} />
            <img className={styles.chestImage} src={chestImage} alt="Ресурсы" />
        </div>
    </Section>
);
