import { Routes, Route, Form } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import UserInfo from './components/UserInfo';
import AccountSettings from './components/AccountSettings'

function App() {
  return(
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/registration' element={<Registration />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/user/:userId' element={<UserProfile />} >
        <Route index element={<UserInfo />} />
        <Route path="settings" element={<AccountSettings />}/>
      </Route>
    </Routes>
  )

}

export default App
