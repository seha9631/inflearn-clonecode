import './App.css'
import Home from './pages/Home'
import Signup from './pages/Signup';
import Search from './pages/Search';
import CartsPage from './pages/carts';
import CoursePage from './pages/course';
import CoursesPage from './pages/Courses';
import LecturePlayer from './pages/lecturePlayer';
import FindPassword from './pages/signin/find/Password';
import FindId from './pages/signin/find/Id';
import Likes from './pages/my/Likes';
import MyCourses from './pages/my/Courses';
import Notfound from './pages/Notfound';
import { Routes, Route } from 'react-router-dom'
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchContext';
import MainLayout from './layout/MainLayout';
import '@mantine/core/styles.css';
import Questions from './pages/community/questions';
import { initializeDefaultUsers } from './utils/initDefaultUsers';
import useCourses from './hooks/useCourses'

function App() {
  const { courses, loading, error } = useCourses({
    category: 'it-programming',
    searchInput: '이정환',
    page: 1
  });

  console.log(courses);
  console.log(loading);
  console.log(error);

  initializeDefaultUsers();

  return (
    <MantineProvider>
      <AuthProvider>
        <Routes>
          <Route element={<SearchProvider><MainLayout /></SearchProvider>}>
            <Route path='/' element={<Home />} />
            <Route path='/courses/:category' element={<CoursesPage />} />
            <Route path='/course/:courseCode' element={<CoursePage />} />
            <Route path='/search' element={<Search />} />
            <Route path='/carts' element={<CartsPage />} />
            <Route path='/my/likes' element={<Likes />} />
            <Route path='/my/courses' element={<MyCourses />} />
            <Route path='/community/questions' element={<Questions />} />
          </Route>

          <Route path='/course/:courseCode/:lectureCode' element={<LecturePlayer />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin/find/password' element={<FindPassword />} />
          <Route path='/signin/find/id' element={<FindId />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </AuthProvider>
    </MantineProvider >
  )
}

export default App;