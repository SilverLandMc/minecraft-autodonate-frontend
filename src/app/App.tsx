import React from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme';
import { AppRouter } from 'app/providers/router';
import { NavBar } from 'widgets/NavBar';
import './styles/index.scss';
import Header from 'widgets/Header/Header';

const App = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Header />
            <NavBar />

            <AppRouter />

            <button onClick={toggleTheme}>Переключить цветовую схему</button>
        </div>
    );
};

export default App;
