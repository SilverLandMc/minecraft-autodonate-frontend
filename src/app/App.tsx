import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme';
import React from 'react';
import classNames from 'shared/lib/aliases/classNames';
import Footer from 'widgets/Footer/Footer';
import Header from 'widgets/Header/Header';
import './styles/index.scss';

const App = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Header />

            <AppRouter />

            <Footer />
        </div>
    );
};

export default App;
