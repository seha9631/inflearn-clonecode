import {
    Modal,
    TextInput,
    PasswordInput,
    Button,
    Group,
    Stack,
    Image,
    Text
} from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { verifyUser } from '../utils/verifyUser';
import { useAuth } from '../contexts/AuthContext';

export default function LoginModal({ opened, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const { login } = useAuth();

    const handleLogin = () => {
        setEmailError('');
        setPasswordError('');
        setLoginError('');

        let isValid = true;

        if (!email) {
            setEmailError('이메일을 입력해주세요.');
            isValid = false;
        }

        if (!password) {
            setPasswordError('비밀번호를 입력해주세요.');
            isValid = false;
        }

        if (!isValid) return;

        const result = verifyUser(email, password);
        if (!result.success) {
            setLoginError(result.error);
            return;
        }

        login(result.user);
        onClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <Image
                    src='https://cdn.inflearn.com/assets/brand/logo.png'
                    alt='Inflearn'
                    height={40}
                    fit='contain'
                />
            }
            centered
            withCloseButton
            radius='md'
            size='sm'
            overlayProps={{ blur: 3 }}
        >
            <Stack spacing='xs'>
                <TextInput
                    placeholder='이메일'
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    onKeyDown={handleKeyDown}
                    error={emailError}
                />
                <PasswordInput
                    placeholder='비밀번호'
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    onKeyDown={handleKeyDown}
                    error={passwordError}
                />

                {loginError && (
                    <Text c='red' size='xs' mt='xs'>
                        {loginError}
                    </Text>
                )}

                <Button fullWidth radius='md' color='green' onClick={handleLogin}>
                    로그인
                </Button>

                <Group position='apart' spacing='xs' mt='xs'>
                    <Link to='/signin/find/password' onClick={onClose}>
                        <Text fz='xs' c='black'>비밀번호 찾기</Text>
                    </Link>
                    <Link to='/signup' onClick={onClose}>
                        <Text fz='xs' c='black'>회원가입</Text>
                    </Link>
                    <Link to='/signin/find/id' onClick={onClose}>
                        <Text fz='xs' c='black'>아이디(이메일) 찾기</Text>
                    </Link>
                </Group>
            </Stack>
        </Modal>
    );
}