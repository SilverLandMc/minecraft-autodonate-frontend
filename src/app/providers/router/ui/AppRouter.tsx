import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import RunnerLoader from 'shared/ui/RunnerLoader/RunnerLoader';

const AppRouter = () => (
    <Suspense fallback={<RunnerLoader />}>
        <Routes>
            {Object.values(routeConfig).map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    </Suspense>
);

export default AppRouter;
