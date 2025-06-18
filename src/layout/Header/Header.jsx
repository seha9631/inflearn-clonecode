import {
    Box,
    Container,
    Group
} from '@mantine/core';
import { useState } from 'react';
import BrandHeader from './BrandHeader';
import NavBarLeft from './NavBarLeft';
import SearchInput from './SearchInput';
import LanguageButton from './LanguageButton';
import LoginButton from './LoginButton';
import NavBarRight from './NavBarRight';

function Header({ query, setQuery, onSearch }) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
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
                            <NavBarRight onLogout={() => setIsLoggedIn(false)} />
                        ) : (
                            <LoginButton onLogin={() => setIsLoggedIn(true)} />
                        )}
                    </Group>
                </Group>
            </Container>
        </Box >
    );
}

export default Header;