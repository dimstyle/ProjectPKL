import { useEffect } from 'react';
import { Routes, Route, Form } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import UserInfo from './components/UserInfo';
import AccountSettings from './components/AccountSettings'
import Post from './components/Post'
import GeneralPosts from './pages/GeneralPosts';
import Dashboard from './pages/Dashboard';
import CreatePosts from './pages/CreatePosts';
import ToDoList from './pages/Todolist';

function App() {
  const setAccessToken = useAuthStore(state => state.setAccessToken);

  useEffect(() => {
    // refresh access token on app mount
    const refreshAccessToken = async () => {
      try {
        const res = await fetch('/api/auth/refresh_token', { method: 'GET', credentials: 'include' });
        if (res.ok) {
          const token = res.headers.get('Authorization');
          if (token) {
            setAccessToken(token);
          }
        }
      } catch (err) {
        console.warn('refresh token failed', err);
      }
    };

    refreshAccessToken();
  }, []);

  return(
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/create-post' element={<CreatePosts />} />
      <Route path='/to_do_list/:project_id' element={<ToDoList/>} />
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
