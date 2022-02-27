import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GlobalStyles } from './components/templates/GlobalStyles';
import { PATHS } from './constants';
import React from 'react';
import { RootState } from './reducers';
import loadable from '@loadable/component';
import { useSelector } from 'react-redux';

const Main = loadable(() => import('./pages/Main'));
const ThreeJS = loadable(() => import('./pages/ThreeJS'));
const Pastel = loadable(() => import('./pages/Pastel'));
const PalettsDetail = loadable(() => import('./pages/PalettsDetail'));

function App() {
  const { configurations } = useSelector((state: RootState) => state.user);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return <Route />;
}

export default App;
