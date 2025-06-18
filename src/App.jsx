
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
import { Routes, Route } from 'react-router-dom'
import TopBar from './layout/TopBar';
import Header from './layout/Header/Header';
import ChannelTalkButton from './layout/ChannelTalkButton';
import Footer from './layout/Footer/Footer';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import Questions from './pages/community/questions';
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const handleSearch = () => {
    setSubmittedQuery(query);
  };

  return (
    <MantineProvider>
      <>
        <TopBar />
        <Header query={query} setQuery={setQuery} onSearch={handleSearch} />
        <div style={{ padding: 20 }}>
          <h2>검색 결과</h2>
          <p>{submittedQuery ? `'${submittedQuery}'에 대한 결과입니다.` : '검색어를 입력해 주세요.'}</p>
        </div>
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
