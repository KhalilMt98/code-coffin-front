import SignUp from './pages/signup';
import Login from './pages/login';
import './styles/App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { routes } from './utils/routes';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<SignUp/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
