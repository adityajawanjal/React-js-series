import React from 'react';
import { Routes , Route, BrowserRouter} from "react-router-dom";
import Join from './pages/Join';
import Chat from './pages/Chat';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Join/>} />
      <Route path='/chat' element={<Chat/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
