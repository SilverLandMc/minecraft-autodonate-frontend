import { FunctionComponent } from 'react';
import { EnticingCards } from '@/widgets/enticingCards';
import { OnlineAndAuthCard } from '@/widgets/onlineAndAuthCard';
import { PlayWithBlogger } from '@/widgets/playWithBlogger';
import { UserAuthBlock } from '@/features/userAuthBlock';
import { useMediaContext } from '@/shared/lib/mediaContext';
import { Optional, Spacing } from '@/shared/ui';
import styles from './MainPage.module.scss';

const mainPageSpacing = <Spacing size={50} sizeS={70} sizeM={90} sizeL={150} />;

/**
 * Главная страница приложения.
 *
 * Включает в себя:
 * - Блок авторизации пользователя по `username`'у и информации о текущем онлайне сервера;
 * - Блок информации о блогере, рекламирующем сервер;
 * - Блок с карточками категорий товаров, ведущих на страницу магазина.
 *
 * @component
 */
const MainPage: FunctionComponent = () => {
    const { isMobile } = useMediaContext();

    return (
        <div className={styles.wrapper}>
            <Spacing size={50} sizeS={76} sizeL={124} />

            <OnlineAndAuthCard />

            <Optional visible={isMobile}>
                <Spacing size={24} />
                <UserAuthBlock standalone />
            </Optional>

            {mainPageSpacing}

            <PlayWithBlogger />

            {mainPageSpacing}

            <EnticingCards />

            {mainPageSpacing}
        </div>
    );
};

export default MainPage;
