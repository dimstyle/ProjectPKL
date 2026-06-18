import { Routes, Route, Form } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import UserInfo from './components/UserInfo';
import AccountSettings from './components/AccountSettings'
import Post from './components/Post'
import GeneralPosts from './pages/GeneralPosts';
import Dashboard from './pages/Dashboard';

function App() {
  return(
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/' element={<Home />}/>
      <Route path='/posts' element={<GeneralPosts />} />
      <Route path='/registration' element={<Registration />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/user/:userId' element={<UserProfile />} >
        <Route index element={<UserInfo />} />
        <Route path="settings" element={<AccountSettings />}/>
        <Route path="post" element={<Post />}/>
      </Route>
    </Routes>
  )

}

export default App
