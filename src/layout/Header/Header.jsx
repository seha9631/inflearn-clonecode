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

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleLogOut = () => {
        setIsLoggedIn(false);
    };

    const handleLogIn = () => {
        setIsLoggedIn(true);
    };

    return (
        <Box component='header' bg='white' py='xs'>
            <Container size='xl'>
                <Group position='apart' align='center'>
                    <Group spacing='xl'>
                        <BrandHeader />
                        <NavBarLeft />
                    </Group>

                    <SearchInput />

                    <Group spacing='sm'>
                        <LanguageButton />

                        {isLoggedIn ? (
                            <NavBarRight onLogout={handleLogOut} />
                        ) : (
                            <LoginButton onLogin={handleLogIn} />
                        )}
                    </Group>
                </Group>
            </Container>
        </Box >
    );
}

export default Header;