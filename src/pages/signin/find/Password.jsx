import {
    Box, Button, Stack, Text, TextInput, Card,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../../utils/validators';
import useCheckEmailExists from '../../../hooks/useCheckEmailExists'
import supabase from '../../../lib/supabaseClient';

function Password() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [message, setMessage] = useState('');
    const { loading, error, checkEmail } = useCheckEmailExists();

    useEffect(() => {
        if (message) {
            const timeout = setTimeout(() => navigate('/'), 2000);
            return () => clearTimeout(timeout);
        }
    }, [message, navigate]);

    const handleSubmit = async () => {
        setMessage('');
        const { isValid, message } = validateEmail(email);
        if (!isValid) return setEmailError(message);

        const exists = await checkEmail(email);
        if (!exists) {
            setEmailError('✗ 존재하지 않는 계정입니다.');
            return;
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email,
            { redirectTo: 'http://localhost:5173/signin/update/password' });
        if (error) {
            setMessage('비밀번호 재설정 이메일 전송에 실패했습니다.');
        } else {
            setMessage('비밀번호 재설정 이메일을 전송했습니다. 메일함을 확인하세요.');
        }
    };

    if (loading) {
        console.log('계정이 존재하는지 확인 중...')
    }

    if (error) {
        console.log('계정이 존재하는지 확인 중 에러 발생!')
    }


    return (
        <Box maw={400} mx='auto' mt={80} mb={80}>
            <Text align='center' fw={700} fz={24} mb={20}>비밀번호 찾기</Text>

            {message ? (
                <Card withBorder shadow='sm' padding='md' radius='md' bg='green.0'>
                    <Text align='center' c='green.8' fw={600}>{message}</Text>
                    <Text align='center' c='dimmed' size='sm'>잠시 후 홈으로 이동합니다...</Text>
                </Card>
            ) : (
                <Stack spacing='sm'>
                    <Text align='center' size='sm' c='dimmed'>
                        가입한 이메일을 입력해 주세요.
                        <br />이메일을 통해 비밀번호 변경 링크가 전송됩니다.
                    </Text>

                    <TextInput
                        placeholder='example@inflab.com'
                        value={email}
                        onChange={(e) => {
                            const value = e.currentTarget.value;
                            setEmail(value);
                            setEmailError(validateEmail(value).message);
                        }}
                        error={emailError}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />

                    <Button fullWidth onClick={handleSubmit} color='#00c471'>변경 링크 전송하기</Button>
                </Stack>
            )}
        </Box>
    );
}

export default Password;