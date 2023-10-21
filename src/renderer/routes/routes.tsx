import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import Layout from '../layout/Layout';
import HomePage from '../pages/home/Home';
import LoginPage from '../pages/login/Login';
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
