import { MemoryRouter as Router } from 'react-router-dom';

import routes from './routes/routes';
import './styles/index.scss';

export default function App() {
  return <Router>{routes}</Router>;
}
