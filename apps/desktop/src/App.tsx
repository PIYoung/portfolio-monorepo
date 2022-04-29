import './App.css';
import 'intro.js/introjs.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './pages/ErrorFallback';
import { GlobalStyles } from './components/templates/GlobalStyles';
import Main from './pages/Main';
import { PATHS } from './constants';
import PalettsDetail from './pages/PalettsDetail';
import Pastel from './pages/Pastel';
import React from 'react';
import { RootState } from './reducers';
import ThreeJS from './pages/ThreeJS';
import { useSelector } from 'react-redux';
import MailParser from './pages/MailParser';

function App() {
  const { configurations } = useSelector((state: RootState) => state.user);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <GlobalStyles colorTheme={configurations.theme} />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path={PATHS.MAIN} element={<Main />} />
          <Route path={PATHS.THREE_JS} element={<ThreeJS />} />
          <Route path={PATHS.PASTEL} element={<Pastel />} />
          <Route path={PATHS.PALETTS_DETAIL} element={<PalettsDetail />} />
          <Route path={PATHS.MAIL_PARSER} element={<MailParser />} />
          <Route path='*' element={<ErrorFallback error={new Error('404')} resetErrorBoundary={() => {}} />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return <Route />;
}

export default App;
