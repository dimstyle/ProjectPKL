import { Routes, Route, Form } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return(
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/registration' element={<Registration />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard/:userId' element={<Dashboard />} />
    </Routes>
  )

}

export default App
