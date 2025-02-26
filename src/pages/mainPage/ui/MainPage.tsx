import React, { FunctionComponent } from 'react';
import { EnticingCards } from 'widgets/enticingCards';
import { OnlineAndAuthCard } from '@/widgets/onlineAndAuthCard';
import { PlayWithBlogger } from '@/widgets/playWithBlogger';
import { UserAuthBlock } from '@/entities/user';
import useMediaContext from '@/shared/hooks/useMediaContext';
import { Optional } from '@/shared/ui';
import Spacing from '@/shared/ui/spacing/Spacing';
import styles from './MainPage.module.scss';

const mainPageSpacing = <Spacing size={50} sizeS={70} sizeM={90} sizeL={150} />;

interface MainPageProps {
    className?: string;
}

const MainPage: FunctionComponent<MainPageProps> = () => {
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
