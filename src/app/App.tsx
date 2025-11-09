import { AppRouter } from '@/app/router';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import './styles/index.scss';

export const App = () => (
    <div className="app">
        <Header />
        <AppRouter />
        <Footer />
    </div>
);
