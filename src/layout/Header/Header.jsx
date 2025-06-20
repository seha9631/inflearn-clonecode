import {
    Box,
    Container,
    Group
} from '@mantine/core';
import BrandHeader from './BrandHeader';
import NavBarLeft from './NavBarLeft';
import SearchInput from './SearchInput';
import LanguageButton from './LanguageButton';
import LoginButton from '../../components/LoginButton';
import NavBarRight from './NavBarRight';
import LoginModal from '../../components/LoginModal';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function Header({ query, setQuery, onSearch }) {
    const { user, logout } = useAuth();
    const [loginModalOpened, setLoginModalOpened] = useState(false);
    const isLoggedIn = !!user;

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
                                <NavBarRight onLogout={logout} />
                            ) : (
                                <LoginButton onLogin={() => setLoginModalOpened(true)} />
                            )}
                        </Group>
                        <LoginModal
                            opened={loginModalOpened}
                            onClose={() => setLoginModalOpened(false)}
                            onLoginSuccess={() => setLoginModalOpened(false)}
                        />
                    </Group>
                </Container>
            </Box>
        </>
    );
}

export default Header;