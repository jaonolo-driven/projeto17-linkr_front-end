import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppContainer from './styles.js';
import SignupPage from '../SignupPage';
import LoginPage from '../LoginPage';
import UserContext from '../../contexts/UserContext.js';
import { useState } from 'react';
import AuthRoutesController from '../AuthRoutesController/index.js';
import Timeline from '../Timeline/Timeline.jsx';

function App() {
  const userState = useState(JSON.parse(localStorage.getItem("user")))

  return (
    <UserContext.Provider value={userState}><AppContainer>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoutesController needsUser={false}/>}>
            <Route path='/sign-up' element={<SignupPage/>}/>
            <Route path='/' element={<LoginPage/>}/>
            {/* Coloquem aqui as rotas que NÃO precisam de usuário logado pra serem acessadas */}
          </Route>
          <Route element={<AuthRoutesController needsUser={true}/>}>
          <Route path='/timeline' element={<Timeline/>}/>
            {/* Coloquem aqui as rotas que precisam de usuário logado pra serem acessadas */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContainer></UserContext.Provider>
  );
}

export default App;