import React, { FunctionComponent } from 'react';
import Spacing from 'shared/ui/spacing/Spacing';
import PlayerAndServerInfoBlock from 'widgets/PlayerAndServerInfoBlock/PlayerAndServerInfoBlock';
import WelcomingTextBlock from 'widgets/WelcomingTextBlock/WelcomingTextBlock';
import styles from './MainPage.module.scss';

interface MainPageProps {
    className?: string;
}

const MainPage: FunctionComponent<MainPageProps> = () => (
    <div className={styles.wrapper}>
        <PlayerAndServerInfoBlock />

        <Spacing size={25} />

        <WelcomingTextBlock />

        <Spacing size={20} />
    </div>
);

export default MainPage;
