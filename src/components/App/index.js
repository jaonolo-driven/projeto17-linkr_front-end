import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import AppContainer from './styles.js';
import LoginPage from '../pages/LoginPage/index.js';
import SignupPage from '../pages/SignupPage/index.js';
import TimelinePage from '../pages/TimelinePage/TimelinePage.jsx';
import PostsByUserPage from '../pages/PostsByUserPage/index.js';
import HashtagPage from '../pages/HashtagPage/HashtagPage.jsx';
import UserContext from '../../contexts/UserContext.js';
import AuthRoutesController from '../AuthRoutesController/index.js';

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
            {/* Coloquem aqui as rotas que precisam de usuário logado pra serem acessadas */}
<<<<<<< HEAD
            <Route path='/timeline' element={ <TimeLine myPost = {'criar compomente'}
                                                        sideBar = {true}
                                                        titleTimeLine = {`Timeline`} /> }  />
            <Route path='/user/:id' element={ <PostsByUser  myPost = {`existo`} 
                                                            sideBar = {``}/> } />
=======
            <Route path='/timeline' element={ <TimelinePage /> }  />
            <Route path='/user/:id' element={ <PostsByUserPage /> } />
>>>>>>> bf22296bfeffc80b7c03d2c29120ae58965c3871
            <Route path='/hashtag/:hashtag' element={ <HashtagPage /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContainer></UserContext.Provider>
  );
}

export default App;