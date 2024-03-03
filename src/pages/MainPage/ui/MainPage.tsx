import React, { FunctionComponent } from 'react';
import Spacing from 'shared/ui/spacing/Spacing';
import PlayerAndServerInfoBlock from 'widgets/PlayerAndServerInfoBlock/PlayerAndServerInfoBlock';
import styles from './MainPage.module.scss';
import WelcomingTextBlock from 'widgets/WelcomingTextBlock/WelcomingTextBlock';

interface MainPageProps {
    className?: string;
}

const MainPage: FunctionComponent<MainPageProps> = () => {
    return (
        <div className={styles.wrapper}>
            <PlayerAndServerInfoBlock />

            <Spacing size={25} />

            <WelcomingTextBlock />

            <Spacing size={20} />
        </div>
    );
};

export default MainPage;
