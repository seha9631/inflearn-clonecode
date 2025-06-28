import {
    Box,
    Button,
    PasswordInput,
    Text,
    TextInput,
    Stack,
    Card,
} from '@mantine/core';
import { useState } from 'react';
import {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validatePhone,
    validateAll,
} from '../utils/validators';
import useFormRedirect from '../hooks/useFormRedirect';
import useSignup from '../hooks/useSignup';
import supabase from '../lib/supabaseClient';

function Signup() {
    const { signup, loading, error } = useSignup();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const [successMessage, setSuccessMessage] = useState('');

    const { scheduleRedirect } = useFormRedirect('/');

    const checkPhoneDuplicate = async (phoneNumber) => {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('id')
            .eq('phone_number', phoneNumber);

        if (error) {
            return false;
        }

        return data.length > 0;
    };

    const handleSubmit = async () => {
        setSuccessMessage('');

        const result = validateAll(
            { email, password, confirmPassword, phoneNumber },
            { validateEmail, validatePassword, validateConfirmPassword, validatePhone }
        );

        setEmailError(result.emailError);
        setPasswordErrors(result.passwordErrors);
        setConfirmError(result.confirmError);
        setPhoneError(result.phoneError);

        if (!result.isValid) return;

        const isDuplicate = await checkPhoneDuplicate(phoneNumber);
        if (isDuplicate) {
            setPhoneError('✗ 이미 가입된 전화번호입니다.');
            return;
        }

        const { error: signupError } = await signup(email, password, {
            user_name: name,
            phone_number: phoneNumber,
        });

        if (signupError) {
            if (signupError.message.includes('is invalid')) {
                console.error('오류:', signupError.message);
                setEmailError('✗ 이미 가입된 이메일입니다.');
            }
            return;
        }

        setSuccessMessage('회원가입이 완료되었습니다! 홈으로 이동합니다.');
        scheduleRedirect();

        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setPhoneNumber('');
    };

    if (loading) {
        return <Text>로딩 중입니다...</Text>;
    }

    if (error) {
        return <Text>에러가 발생했습니다: {error.message}</Text>;
    }

    return (
        <Box maw={400} mx='auto'>
            <h2>회원가입</h2>

            {successMessage && (
                <Card withBorder shadow='sm' mb='md' padding='md' radius='md' bg='green.0'>
                    <Text c='green.8' fw={600}>
                        {successMessage}
                    </Text>
                </Card>
            )}

            <Stack mb={40}>
                <TextInput
                    label='이메일'
                    placeholder='example@inflab.com'
                    value={email}
                    onChange={(e) => {
                        const val = e.currentTarget.value;
                        setEmail(val);
                        const result = validateEmail(val);
                        setEmailError(result.message);
                    }}
                    error={emailError}
                />

                <PasswordInput
                    label='비밀번호'
                    placeholder='********'
                    value={password}
                    onChange={(e) => {
                        const val = e.currentTarget.value;
                        setPassword(val);
                        const result = validatePassword(val);
                        setPasswordErrors(result.messages);
                        setConfirmError(validateConfirmPassword(val, confirmPassword).message);
                    }}
                />

                <Stack spacing={4}>
                    {[
                        '영문/숫자/특수문자 중 2가지 이상 포함',
                        '8자 이상 32자 이하 입력 (공백 제외)',
                        '연속 3자 이상 동일한 문자/숫자 제외',
                    ].map((rule, idx) => (
                        <Text
                            key={idx}
                            size='xs'
                            c={passwordErrors.includes(rule) ? 'red' : password ? 'green' : 'gray'}
                        >
                            {passwordErrors.includes(rule) ? '✗' : '✓'} {rule}
                        </Text>
                    ))}
                </Stack>

                <PasswordInput
                    label='비밀번호 확인'
                    placeholder='********'
                    value={confirmPassword}
                    onChange={(e) => {
                        const val = e.currentTarget.value;
                        setConfirmPassword(val);
                        const result = validateConfirmPassword(password, val);
                        setConfirmError(result.message);
                    }}
                    error={confirmError}
                />

                <TextInput
                    label='이름'
                    placeholder='홍길동'
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                />

                <TextInput
                    label='전화번호'
                    placeholder='01012345678'
                    value={phoneNumber}
                    onChange={(e) => {
                        const val = e.currentTarget.value;
                        setPhoneNumber(val);
                        const result = validatePhone(val);
                        setPhoneError(result.message);
                    }}
                    error={phoneError}
                />

                <Button fullWidth mt='md' onClick={handleSubmit} color='green'>
                    가입하기
                </Button>
            </Stack>
        </Box>
    );
}

export default Signup;