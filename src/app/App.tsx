import React from 'react';

import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme';
import { AppRouter } from 'app/providers/router';
import Header from 'widgets/Header/Header';
import classNames from 'shared/lib/aliases/classNames';
import './styles/index.scss';

const App = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Header />

            <AppRouter />
        </div>
    );
};

export default App;
