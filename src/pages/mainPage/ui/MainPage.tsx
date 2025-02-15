import React, { FunctionComponent } from 'react';
import { PlayerAndServerInfoBlock } from '@/widgets/PlayerAndServerInfoBlock';
import WelcomingTextBlock from '@/widgets/WelcomingTextBlock/WelcomingTextBlock';
import Spacing from '@/shared/ui/spacing/Spacing';
import styles from './MainPage.module.scss';

interface MainPageProps {
    className?: string;
}

const MainPage: FunctionComponent<MainPageProps> = () => (
    <div className={styles.wrapper}>
        <Spacing size={50} sizeS={76} sizeL={124} />

        <PlayerAndServerInfoBlock />

        <Spacing size={25} />

        <WelcomingTextBlock />

        <Spacing size={20} />
    </div>
);

export default MainPage;
