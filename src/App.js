import SignUp from './pages/signup';
import Login from './pages/login';
import './styles/App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { routes } from './utils/routes';
import CodeEditor from './pages/code-editor/CodeEditor';
import AdminDashboard from './pages/admin';
import UserDashMessages from './pages/userDashMessages';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDashMessages/>} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<SignUp/>}/>
        <Route path={routes.codeEditor} element={<CodeEditor/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
