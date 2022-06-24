import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
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
  const [refreshList, setRefreshList] = useState(0)
  const [update, setUpdate] = useState(false)

  const PostByUserHolder = () => {
    const {id} = useParams()
    return <PostsByUserPage id={id} key={id} updateState={[update, setUpdate]}/> 
  }

  const HashtagHolder = () => {
    const {hashtag} = useParams()
    return <HashtagPage key={hashtag} updateState={[update, setUpdate]}/>
  }

  return (
    <UserContext.Provider value={[token, setToken, refreshList, setRefreshList]}><AppContainer>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoutesController needsUser={false}/>}>
            <Route path='/sign-up' element={<SignupPage/>}/>
            <Route path='/' element={<LoginPage/>}/>
            {/* Coloquem aqui as rotas que NÃO precisam de usuário logado pra serem acessadas */}
          </Route>
          <Route element={<AuthRoutesController needsUser={true}/>}>
            {/* Coloquem aqui as rotas que precisam de usuário logado pra serem acessadas */}
            <Route path='/timeline' element={ <TimelinePage updateState={[update, setUpdate]}/> }  />
            <Route path='/user/:id' element={ <PostByUserHolder /> } />
            <Route path='/hashtag/:hashtag' element={ <HashtagHolder /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContainer></UserContext.Provider>
  );
}

export default App;