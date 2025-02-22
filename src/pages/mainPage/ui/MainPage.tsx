import { UserAuthBlock } from 'entities/user';
import React, { FunctionComponent } from 'react';
import { OnlineAndAuthCard } from '@/widgets/onlineAndAuthCard';
import { PlayWithBlogger } from '@/widgets/playWithBlogger';
import useMediaContext from '@/shared/hooks/useMediaContext';
import { Optional } from '@/shared/ui';
import Spacing from '@/shared/ui/spacing/Spacing';
import styles from './MainPage.module.scss';

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

            <Spacing size={25} />

            <PlayWithBlogger />

            <Spacing size={20} />
        </div>
    );
};

export default MainPage;
