import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import Layout from '../layout/Layout';
import HomePage from '../pages/home/home.page';
import LoginPage from '../pages/login/login.page';
import WelcomePage from '../pages/welcome/welcome.page';
import { HOME, LOGIN, WELCOME } from './path';

export default (
  <Suspense>
    <Routes>
      <Route path={WELCOME} element={<WelcomePage />} />
      <Route path={LOGIN} element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path={HOME} element={<HomePage />} />
      </Route>
    </Routes>
  </Suspense>
);
