import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';

function App() {
  return(
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/registration' element={<Registration />}/>
      <Route path='/login' element={<Login />} />
    </Routes>
  )

}

export default App
