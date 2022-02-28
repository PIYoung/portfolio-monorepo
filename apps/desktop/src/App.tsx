import './App.css';
import 'intro.js/introjs.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useCallback } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { GlobalStyles } from './components/templates/GlobalStyles';
import { PATHS } from './constants';
import { RootState } from './reducers';
import loadable from '@loadable/component';
import { useSelector } from 'react-redux';

const Main = loadable(() => import('./pages/Main'));
const ThreeJS = loadable(() => import('./pages/ThreeJS'));
const Pastel = loadable(() => import('./pages/Pastel'));
const PalettsDetail = loadable(() => import('./pages/PalettsDetail'));
const ErrorFallback = loadable(() => import('./pages/ErrorFallback'));

function App() {
  const { configurations } = useSelector((state: RootState) => state.user);

  const handleError = useCallback((error: Error, info: { componentStack: string }) => {
    console.log('hi');
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <GlobalStyles colorTheme={configurations.theme} />
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.MAIN} element={<Main />} />
          <Route path={PATHS.THREE_JS} element={<ThreeJS />} />
          <Route path={PATHS.PASTEL} element={<Pastel />} />
          <Route path={PATHS.PALETTS_DETAIL} element={<PalettsDetail />} />
          <Route
            path='*'
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return <Route />;
}

export default App;
