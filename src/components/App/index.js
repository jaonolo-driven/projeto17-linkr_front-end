import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppContainer from './styles.js';
import LoginPage from '../pages/LoginPage/index.js';
import SignupPage from '../pages/SignupPage/index.js';
import UserContext from '../../contexts/UserContext.js';
import { useState } from 'react';
import AuthRoutesController from '../AuthRoutesController/index.js';
import TimeLine from '../pages/TimeLine/TimeLine.js';

function App() {
  const userState = useState(JSON.parse(localStorage.getItem("user")))

  return (
    <UserContext.Provider value={userState}><AppContainer>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoutesController needsUser={false}/>}>
            <Route path='/sign-up' element={<SignupPage/>}/>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/timeline' element={ <TimeLine myPost = {'crear compomente'}
                                                        sideBar = {``} 
                                                        titleTimeLine = {`Saulo title`} /> }/>
            {/* Coloquem aqui as rotas que NÃO precisam de usuário logado pra serem acessadas */}
          </Route>
          <Route element={<AuthRoutesController needsUser={true}/>}>
            {/* Coloquem aqui as rotas que precisam de usuário logado pra serem acessadas */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContainer></UserContext.Provider>
  );
}

export default App;