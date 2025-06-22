import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ChannelTalkButton from './ChannelTalkButton';

function MainLayout() {
    return (
        <>
            <Topbar />
            <Header />
            <ChannelTalkButton />
            <Outlet />
            <Footer />
        </>
    );
}

export default MainLayout;