import { AppRouter } from '@/app/providers/router';
import Footer from '@/widgets/Footer/Footer';
import './styles/index.scss';
import { Header } from '../widgets/header';

const App = () => (
    <div className="app">
        <Header />

        <AppRouter />

        <Footer />
    </div>
);

export default App;
