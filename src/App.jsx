
import './App.css'
import Home from './pages/Home'
import Signup from './pages/Signup';
import Search from './pages/Search';
import Carts from './pages/Carts';
import CoureseList from './pages/Course';
import CourseDetail from './pages/Courses';
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
import CourseCard from './components/CourseCard';

const mockData1 = {
  "title": "한 입 크기로 잘라먹는 타입스크립트(TypeScript)",
  "courseCode": "한입-크기-타입스크립트",
  "instructor": "이정환",
  "originalPrice": 55000,
  "discountRate": null,
  "discountPrice": null,
  "tags": "개발 프로그래밍",
  "level": "초급",
  "thumbnail": "https://cdn.inflearn.com/public/files/courses/330452/cover/01jx9xw8c433n8hppthehe9r1g?w=420"
}

const mockData2 = {
  "title": "초초보도 할 수 있다! 파이썬으로 씈 만드는 스페이스 인베이더",
  "courseCode": "space-invader-python",
  "instructor": "쓱코치",
  "originalPrice": 37400,
  "discountRate": 90,
  "discountPrice": 3740,
  "tags": "개임 개발",
  "level": "입문",
  "thumbnail": "https://cdn.inflearn.com/public/files/courses/336790/cover/01jvkmc0wrdznymhj6tpb4pkaq?w=420"
}

function App() {
  return (
    <MantineProvider>
      <>
        <TopBar />
        <Header />
        <ChannelTalkButton />
        <CourseCard {...mockData1} />
        <CourseCard {...mockData2} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/courese' element={<CoureseList />} />
          <Route path='/courese/:id' element={<CourseDetail />} />
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
