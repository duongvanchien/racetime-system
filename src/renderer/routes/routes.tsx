import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import Layout from '../layout/layout';
import HomePage from '../pages/home/home.page';
import LoginPage from '../pages/login/login.page';
import { HOME, LOGIN } from './path';

export default (
  <Suspense>
    <Routes>
      <Route path={LOGIN} element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path={HOME} element={<HomePage />} />
      </Route>
    </Routes>
  </Suspense>
);
