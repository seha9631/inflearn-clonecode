import {
    Box,
    Button,
    PasswordInput,
    Text,
    TextInput,
    Stack,
} from '@mantine/core';
import { useState } from 'react';

function Signup() {
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

    const validateEmail = (value) => {
        const isValid = /\S+@\S+\.\S+/.test(value);
        setEmailError(isValid ? '' : '✗ 이메일 형식이 올바르지 않습니다.');
        return isValid;
    };

    const validatePhone = (value) => {
        const isValid = /^010\d{7,8}$/.test(value);
        setPhoneError(isValid ? '' : '✗ 전화번호 형식이 올바르지 않습니다.');
        return isValid;
    };

    const isPhoneDuplicate = (value) => {
        for (let key in localStorage) {
            try {
                const user = JSON.parse(localStorage.getItem(key));
                if (user?.phoneNumber === value) {
                    setPhoneError('✗ 이미 가입된 전화번호입니다.');
                    return true;
                }
            } catch (e) {
                continue;
            }
        }
        return false;
    };

    const validatePassword = (value) => {
        const errors = [];

        if (
            !/(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])|(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(value)
        ) {
            errors.push('영문/숫자/특수문자 중 2가지 이상 포함');
        }

        if (value.length < 8 || value.length > 32) {
            errors.push('8자 이상 32자 이하 입력 (공백 제외)');
        }

        if (/(.)\1\1/.test(value)) {
            errors.push('연속 3자 이상 동일한 문자/숫자 제외');
        }

        setPasswordErrors(errors);
        return errors.length === 0;
    };

    const validateConfirmPassword = (value) => {
        const isMatch = value === password;
        setConfirmError(isMatch ? '' : '✗ 비밀번호가 일치하지 않습니다.');
        return isMatch;
    };

    const handleSubmit = () => {
        setSuccessMessage('');

        const emailValid = validateEmail(email);
        const passwordValid = validatePassword(password);
        const confirmValid = validateConfirmPassword(confirmPassword);
        const phoneValid = validatePhone(phoneNumber);

        if (!emailValid || !passwordValid || !confirmValid || !phoneValid) return;

        if (localStorage.getItem(email)) {
            setEmailError('✗ 이미 가입된 이메일입니다.');
            return;
        }

        if (isPhoneDuplicate(phoneNumber)) {
            return;
        }

        const userInfo = {
            password,
            name,
            phoneNumber,
            cart: [],
            wishlist: [],
            enrolled: [],
            coupon: [],
            point: 0,
        };

        localStorage.setItem(email, JSON.stringify(userInfo));
        setSuccessMessage('가입 성공!');

        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setPhoneNumber('');
    };

    return (
        <Box maw={400} mx="auto">
            <h2>회원가입</h2>
            <Stack mb={40}>
                <TextInput
                    label="이메일"
                    placeholder="example@inflab.com"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.currentTarget.value);
                        validateEmail(e.currentTarget.value);
                    }}
                    error={emailError}
                />

                <PasswordInput
                    label="비밀번호"
                    placeholder="********"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.currentTarget.value);
                        validatePassword(e.currentTarget.value);
                        validateConfirmPassword(confirmPassword);
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
                            size="xs"
                            c={passwordErrors.includes(rule) ? 'red' : password ? 'green' : 'gray'}
                        >
                            {passwordErrors.includes(rule) ? '✗' : '✓'} {rule}
                        </Text>
                    ))}
                </Stack>

                <PasswordInput
                    label="비밀번호 확인"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.currentTarget.value);
                        validateConfirmPassword(e.currentTarget.value);
                    }}
                    error={confirmError}
                />

                <TextInput
                    label="이름"
                    placeholder="홍길동"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                />

                <TextInput
                    label="전화번호"
                    placeholder="01012345678"
                    value={phoneNumber}
                    onChange={(e) => {
                        setPhoneNumber(e.currentTarget.value);
                        validatePhone(e.currentTarget.value);
                    }}
                    error={phoneError}
                />

                <Button fullWidth mt="md" onClick={handleSubmit} color="green">
                    가입하기
                </Button>

                {successMessage && (
                    <Text size="sm" c="green" align="center">
                        {successMessage}
                    </Text>
                )}
            </Stack>
        </Box>
    );
}

export default Signup;
