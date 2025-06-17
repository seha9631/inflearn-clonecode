
import './App.css'
import Home from './pages/Home'
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Carts from "./pages/Carts";
import CoureseList from "./pages/Course";
import CourseDetail from "./pages/Courses";
import FindPassword from "./pages/signin/find/Password";
import FindId from "./pages/signin/find/Id";
import Notfound from './pages/Notfound';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import TopBar from './layout/TopBar';
import Header from './layout/Header';
import ChannelTalkButton from './layout/ChannelTalkButton';
import Footer from './layout/Footer';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import Questions from './pages/community/questions';

function App() {
  const nav = useNavigate();

  const onClickButton = () => {
    nav("carts");
  }

  return (
    <MantineProvider>
      <>
        <TopBar />
        <Header />
        <ChannelTalkButton />
        <div>
          <Link to={"/"}>Home</Link>
          <Link to={"/courese"}>CoureseList</Link>
          <Link to={"/courese/1"}>Courese1</Link>
          <Link to={"/signup"}>Signup</Link>
          <Link to={"/signin/find/password"}>FindPassword</Link>
          <Link to={"/signin/find/id"}>FindId</Link>
          <Link to={"/"}>Home</Link>
        </div>
        <button onClick={onClickButton}>
          장바구니
        </button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courese" element={<CoureseList />} />
          <Route path="/courese/:id" element={<CourseDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/community/questions" element={<Questions />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin/find/password" element={<FindPassword />} />
          <Route path="/signin/find/id" element={<FindId />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
      </>
    </MantineProvider>
  )
}

export default App
