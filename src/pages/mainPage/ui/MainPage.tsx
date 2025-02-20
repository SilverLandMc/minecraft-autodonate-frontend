import { UserAuthBlock } from 'entities/user';
import React, { FunctionComponent } from 'react';
import useMediaContext from 'shared/hooks/useMediaContext';
import { Optional } from 'shared/ui';
import { PlayerAndServerInfoBlock } from '@/widgets/PlayerAndServerInfoBlock';
import WelcomingTextBlock from '@/widgets/WelcomingTextBlock/WelcomingTextBlock';
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

            <PlayerAndServerInfoBlock />

            <Optional visible={isMobile}>
                <Spacing size={24} />
                <UserAuthBlock standalone />
            </Optional>

            <Spacing size={25} />

            <WelcomingTextBlock />

            <Spacing size={20} />
        </div>
    );
};

export default MainPage;
