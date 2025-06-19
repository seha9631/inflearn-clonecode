
import './App.css'
import Home from './pages/Home'
import Signup from './pages/Signup';
import Search from './pages/Search';
import Carts from './pages/Carts';
import CourseDetail from './pages/Course';
import CourseList from './pages/Courses';
import FindPassword from './pages/signin/find/Password';
import FindId from './pages/signin/find/Id';
import Notfound from './pages/Notfound';
import { Routes, Route, useNavigate } from 'react-router-dom'
import TopBar from './layout/TopBar';
import Header from './layout/Header/Header';
import ChannelTalkButton from './layout/ChannelTalkButton';
import Footer from './layout/Footer/Footer';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import Questions from './pages/community/questions';
import { useState } from 'react';

function App() {
  const userId = 'seha';
  const userInfo = {
    password: '9631',
    phoneNumber: '01011119631',
    name: '하상은',
    age: 27,
    cart: ['김호-리더십-메시지-메이커', '기획자와-pm을-위한-artificial-intelligence-강의”, "기초-대수학-중고등'],
    wishlist: ['프롬프트-엔지니어링-챗지피티'],
    enrolled: ['한입-크기-타입스크립트', 'typescript-react-perfect-course'],
    coupon: ['INFCON2024 전용 쿠폰'],
    point: 12000
  };
  localStorage.setItem(userId, JSON.stringify(userInfo));
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?s=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <MantineProvider>
      <>
        <TopBar />
        <Header query={query} setQuery={setQuery} onSearch={handleSearch} />
        <ChannelTalkButton />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/courses/:category" element={<CourseList />} />
          <Route path='/course/:id' element={<CourseDetail />} />
          <Route path='/search' element={<Search />} />
          <Route path='/community/questions' element={<Questions />} />
          <Route path='/carts' element={<Carts />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin/find/password' element={<FindPassword />} />
          <Route path='/signin/find/id' element={<FindId />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
        <Footer />
      </>
    </MantineProvider>
  )
}

export default App
