import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { BackgroundColor, ModernButton, ModernButtonProps } from 'shared/ui';
import Section from 'shared/ui/section/Section';
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
        </div>

        <div className={styles.resourcesCard}>
            <h3 className={styles.title}>Ресурсы</h3>
            <ShoppingButton background={BackgroundColor.ORANGE} />
        </div>
    </Section>
);
