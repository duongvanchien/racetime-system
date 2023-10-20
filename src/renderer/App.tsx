import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles/index.scss';
import 'tailwindcss/tailwind.css';
import LoginPage from './pages/login/login.page';
import Layout from './layouts/layout';
import HomePage from './pages/home/home.page';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />

        <Route path="/admin/:path?" exact>
          <Layout>
            <Switch>
              <Route path="/admin" exact component={HomePage} />
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}
