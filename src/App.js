import SignUp from './pages/signup';
import Login from './pages/login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { routes } from './utils/routes';
import CodeEditor from './pages/code-editor/CodeEditor';
import AdminDashboard from './pages/admin';
import UserDashMessages from './pages/userDashMessages';
import UserDashProjects from './pages/userDashProjects';
import UserDashProfile from './pages/userDashProfile';
import LandingPage from './pages/landingPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<LandingPage/>} />
        <Route path={routes.messages} element={<UserDashMessages/>} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<SignUp/>}/>
        <Route path={routes.codeEditor} element={<CodeEditor/>}/>
        <Route path={routes.Profile} element={<UserDashProfile/>}/>
        <Route path={routes.projects} element={<UserDashProjects/>}/>
        <Route path={routes.profile} element={<UserDashProfile/>}/>
        <Route path={routes.admin} element={<AdminDashboard/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
