import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import History from './Components/History';
import Login from './Components/Login';
// import Todo from '../src/Components/Todo';
import Todos from './Components/Todos';

const App = () => {

  let date = new Date();
  let time = date.getTime();
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login time={time}/>}/>
        <Route path='/todo/:id' element={<Todos time={time}/>}/>
        <Route path='/history' element={<History/>}/>

  
        {/* <Route path='/history' element={<History/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App