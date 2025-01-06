import { AppRouter } from 'app/providers/router';
import Footer from 'widgets/Footer/Footer';
import Header from 'widgets/Header/Header';
import './styles/index.scss';

const App = () => (
    <div className="app">
        <Header />

        <AppRouter />

        <Footer />
    </div>
);

export default App;
