import {
    Box, Button, Stack, Text, TextInput, Card,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../../utils/validators';

function Password() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (successMessage) {
            const timeout = setTimeout(() => navigate('/'), 2000);
            return () => clearTimeout(timeout);
        }
    }, [successMessage, navigate]);

    const handleSubmit = () => {
        setSuccessMessage('');
        const { isValid, message } = validateEmail(email);
        if (!isValid) return setEmailError(message);

        const stored = localStorage.getItem(email);
        if (!stored) return setEmailError('✗ 존재하지 않는 사용자입니다.');

        console.log(`비밀번호 변경 링크 전송됨: ${email}`);
        setSuccessMessage('비밀번호 변경 링크가 이메일로 전송되었습니다.');
    };

    return (
        <Box maw={400} mx="auto" mt={80} mb={80}>
            <Text align="center" fw={700} fz={24} mb={20}>비밀번호 찾기</Text>
            {successMessage ? (
                <Card withBorder shadow="sm" padding="md" radius="md" bg="green.0">
                    <Text align="center" c="green.8" fw={600}>{successMessage}</Text>
                    <Text align="center" c="dimmed" size="sm">잠시 후 홈으로 이동합니다...</Text>
                </Card>
            ) : (
                <Stack spacing="sm">
                    <Text align="center" size="sm" c="dimmed">
                        가입한 이메일을 입력해 주세요.
                        <br />이메일을 통해 비밀번호 변경 링크가 전송됩니다.
                    </Text>
                    <TextInput
                        placeholder="example@inflab.com"
                        value={email}
                        onChange={(e) => {
                            const value = e.currentTarget.value;
                            setEmail(value);
                            setEmailError(validateEmail(value).message);
                        }}
                        error={emailError}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <Button fullWidth onClick={handleSubmit} color="#00c471">변경 링크 전송하기</Button>
                </Stack>
            )}
        </Box>
    );
}

export default Password;