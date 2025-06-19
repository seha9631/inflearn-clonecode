import {
    Box,
    Container,
    Group
} from '@mantine/core';
import { useEffect, useState } from 'react';
import BrandHeader from './BrandHeader';
import NavBarLeft from './NavBarLeft';
import SearchInput from './SearchInput';
import LanguageButton from './LanguageButton';
import LoginButton from './LoginButton';
import NavBarRight from './NavBarRight';
import LoginModal from '../../components/LoginModal';
import { getUser, logout } from '../../utils/auth';

function Header({ query, setQuery, onSearch }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginModalOpened, setLoginModalOpened] = useState(false);

    useEffect(() => {
        const user = getUser();
        setIsLoggedIn(!!user);
    }, []);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
    };

    return (
        <>
            <Box component='header' bg='white' py='xs'>
                <Container size='xl'>
                    <Group position='apart' align='center'>
                        <Group spacing='xl'>
                            <BrandHeader />
                            <NavBarLeft />
                        </Group>

                        <SearchInput query={query} setQuery={setQuery} onSearch={onSearch} />

                        <Group spacing='sm'>
                            <LanguageButton />
                            {isLoggedIn ? (
                                <NavBarRight onLogout={handleLogout} />
                            ) : (
                                <LoginButton onLogin={() => setLoginModalOpened(true)} />
                            )}
                        </Group>
                        <LoginModal
                            opened={loginModalOpened}
                            onClose={() => setLoginModalOpened(false)}
                            onLoginSuccess={() => {
                                setIsLoggedIn(true);
                                setLoginModalOpened(false);
                            }}
                        />
                    </Group>
                </Container>
            </Box>
        </>
    );
}

export default Header;