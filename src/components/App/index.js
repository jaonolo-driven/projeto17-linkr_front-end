import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppContainer from './styles.js';

import LoginPage from '../pages/LoginPage/index.js';
import SignupPage from '../pages/SignupPage/index.js';
import PostsByUser from '../PostsByUserPage/index.js';
import HashtagPage from '../pages/HashtagPage/index.jsx';

import UserContext from '../../contexts/UserContext.js';
import { useEffect, useState } from 'react';
import AuthRoutesController from '../AuthRoutesController/index.js';
import TimeLine from '../pages/TimeLine/TimeLine.js';

function App() {
  const tokenStorageString = localStorage.getItem("user")
  const tokenStorage = JSON.parse(tokenStorageString)
  const [token, setToken] = useState(tokenStorage)

  return (
    <UserContext.Provider value={[token, setToken]}><AppContainer>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoutesController needsUser={false}/>}>
            {/* Coloquem aqui as rotas que NÃO precisam de usuário logado pra serem acessadas */}
            <Route path='/sign-up' element={<SignupPage/>}/>
            <Route path='/' element={<LoginPage/>}/>
            {/* Coloquem aqui as rotas que NÃO precisam de usuário logado pra serem acessadas */}
          </Route>
          <Route element={<AuthRoutesController needsUser={true}/>}>
            <Route path='/timeline' element={ <TimeLine myPost = {'crear compomente'}
                                                        sideBar = {`existe`} 
                                                        titleTimeLine = {`Saulo title`} /> }/>
            {/* Coloquem aqui as rotas que precisam de usuário logado pra serem acessadas */}
            <Route path='/timeline' element={ <TimeLine myPost = {'criar compomente'}
                                                        sideBar = {'vai ter side'}
                                                        titleTimeLine = {`TimeLine`} /> }  />
            <Route path='/user/:id' element={ <PostsByUser  myPost = {`existo`} 
                                                            sideBar = {`existo`}/> } />
            <Route path='/hashtag/:hashtag' element={ <HashtagPage /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContainer></UserContext.Provider>
  );
}

export default App;