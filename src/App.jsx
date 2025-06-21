
import './App.css'
import Home from './pages/Home'
import Signup from './pages/Signup';
import Search from './pages/Search';
import Carts from './pages/Carts';
import CourseDetail from './pages/Course';
import CourseList from './pages/Courses';
import LecturePlayer from './pages/LecturePlayer';
import FindPassword from './pages/signin/find/Password';
import FindId from './pages/signin/find/Id';
import Notfound from './pages/Notfound';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Topbar from './layout/Topbar';
import Header from './layout/Header/Header';
import ChannelTalkButton from './layout/ChannelTalkButton';
import Footer from './layout/Footer/Footer';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './contexts/AuthContext';
import '@mantine/core/styles.css';
import Questions from './pages/community/questions';
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?s=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <MantineProvider>
      <AuthProvider>
        <Topbar />
        <Header query={query} setQuery={setQuery} onSearch={handleSearch} />
        <ChannelTalkButton />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/courses/:category" element={<CourseList />} />
          <Route path='/course/:courseCode' element={<CourseDetail />} />
          <Route path="/course/:courseCode/:lectureCode" element={<LecturePlayer />} />
          <Route path='/search' element={<Search />} />
          <Route path='/community/questions' element={<Questions />} />
          <Route path='/carts' element={<Carts />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin/find/password' element={<FindPassword />} />
          <Route path='/signin/find/id' element={<FindId />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </MantineProvider>
  )
}

export default App
