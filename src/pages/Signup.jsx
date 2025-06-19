import {
    Box,
    Button,
    PasswordInput,
    Text,
    TextInput,
    Stack,
} from '@mantine/core';
import { useState } from 'react';
import {
    validateEmail,
    validatePhone,
    isPhoneDuplicate,
    validatePassword,
    validateConfirmPassword,
} from '../utils/validators';

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

    const handleSubmit = () => {
        setSuccessMessage('');

        const emailResult = validateEmail(email);
        const passwordResult = validatePassword(password);
        const confirmResult = validateConfirmPassword(password, confirmPassword);
        const phoneResult = validatePhone(phoneNumber);

        setEmailError(emailResult.message);
        setPasswordErrors(passwordResult.messages);
        setConfirmError(confirmResult.message);
        setPhoneError(phoneResult.message);

        if (!emailResult.isValid || !passwordResult.isValid || !confirmResult.isValid || !phoneResult.isValid) return;

        if (localStorage.getItem(email)) {
            setEmailError('✗ 이미 가입된 이메일입니다.');
            return;
        }

        if (isPhoneDuplicate(phoneNumber)) {
            setPhoneError('✗ 이미 가입된 전화번호입니다.');
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
                        const val = e.currentTarget.value;
                        setEmail(val);
                        setEmailError(validateEmail(val).message);
                    }}
                    error={emailError}
                />

                <PasswordInput
                    label="비밀번호"
                    placeholder="********"
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
                        const val = e.currentTarget.value;
                        setConfirmPassword(val);
                        setConfirmError(validateConfirmPassword(password, val).message);
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
                        const val = e.currentTarget.value;
                        setPhoneNumber(val);
                        setPhoneError(validatePhone(val).message);
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