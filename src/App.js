import SignUp from './pages/signup';
import Login from './pages/login';
import UserDashProfile from './pages/userDashProfile';
import { Link } from 'react-router-dom';

import "./styles/utilities.css";

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { routes } from './utils/routes';
import CodeEditor from './pages/code-editor/CodeEditor';
import UserDashProjects from './pages/userDashProjects';
import UserDashMessages from './pages/userDashMessages';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<SignUp/>}/>
        <Route path={routes.codeEditor} element={<CodeEditor/>}/>
        
        <Route path="/profile" element={<UserDashProfile />} />
        <Route path="/projects" element={<UserDashProjects />} />
        <Route path="/messages" element={<UserDashMessages />} />
        

        </Routes>
    </BrowserRouter>
  );
}

export default App;
