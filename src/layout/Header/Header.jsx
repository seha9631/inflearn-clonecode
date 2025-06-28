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
import { useSearch } from '../../contexts/SearchContext';
import { useIsLoggedIn } from '../../contexts/IsLoggedInContext';
import { logOut } from '../../utils/auth';

function Header() {
    const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();
    const [loginModalOpened, setLoginModalOpened] = useState(false);
    const { query, setQuery } = useSearch();

    const handleLogOut = async () => {
        const errorMessage = await logOut();

        if (errorMessage) {
            alert(errorMessage);
            return;
        }

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

                        <SearchInput query={query} setQuery={setQuery} />

                        <Group spacing='sm'>
                            <LanguageButton />
                            {isLoggedIn ? (
                                <NavBarRight onLogout={() => handleLogOut()} />
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