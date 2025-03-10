import { AppRouter } from '@/app/providers/router';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import './styles/index.scss';

const App = () => (
    <div className="app">
        <Header />
        <AppRouter />
        <Footer />
    </div>
);

export default App;
