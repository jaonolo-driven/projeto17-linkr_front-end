import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppContainer from './styles.js';
import SignupPage from '../SignupPage';

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-up' element={<SignupPage/>}/>
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
