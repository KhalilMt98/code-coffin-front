import SignUp from './pages/signup';
import UserDashProfile from './pages/userDashProfile';

import './styles/App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { routes } from './utils/routes';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
