// Id.jsx
import {
    Box,
    Button,
    Stack,
    Text,
    TextInput,
    Select,
    Card,
} from '@mantine/core';
import { useState } from 'react';
import { COUNTRY_CODES } from '../../../utils/constants';
import { validatePhone } from '../../../utils/validators';
import useVerification from '../../../hooks/useVerification';

function Id() {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [showVerification, setShowVerification] = useState(false);
    const [foundEmail, setFoundEmail] = useState('');

    const {
        code,
        setCode,
        codeError,
        verified,
        timeLeft,
        formatTime,
        generateCode,
        verifyCode,
        generatedCode,
    } = useVerification();

    const handleRequest = () => {
        if (!phone.trim()) {
            setError('✗ 휴대폰 번호를 입력해 주세요.');
            return;
        }

        const { isValid, message } = validatePhone(phone);
        if (!isValid) {
            setError(message);
            return;
        }

        generateCode();
        setShowVerification(true);
        setError('');
    };

    const handleVerify = () => {
        verifyCode();
        const email = findEmailByPhone(phone);
        if (email) setFoundEmail(maskEmail(email));
    };

    const findEmailByPhone = (phone) => {
        for (let key in localStorage) {
            try {
                const user = JSON.parse(localStorage.getItem(key));
                if (user?.phoneNumber === phone) {
                    return key;
                }
            } catch (e) {
                continue;
            }
        }
        return '';
    };

    const maskEmail = (email) => {
        const [user, domain] = email.split('@');
        return `${user.slice(0, 2)}***${user.slice(-2)}@${domain}`;
    };

    return (
        <Box maw={400} mx="auto" mt={80} mb={80}>
            <Text align="center" fw={700} fz={24} mb={20}>
                아이디(이메일)
            </Text>

            {verified ? (
                <Card withBorder p="md" radius="md" shadow="sm">
                    <Stack spacing="xs">
                        <Text fw={700}>아이디(이메일) 정보</Text>
                        <Text>{foundEmail || '일치하는 이메일이 없습니다.'}</Text>
                        <Button fullWidth color="green" mt="sm">
                            로그인
                        </Button>
                    </Stack>
                </Card>
            ) : (
                <Stack>
                    <Select
                        label="국가 선택"
                        defaultValue="+82"
                        data={COUNTRY_CODES}
                    />

                    <TextInput
                        placeholder="휴대폰 번호 입력 예시) 01012345678"
                        value={phone}
                        onChange={(e) => setPhone(e.currentTarget.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleRequest()}
                        error={error}
                    />

                    <Button fullWidth mt="sm" onClick={handleRequest} color="#00c471">
                        인증 요청
                    </Button>

                    {showVerification && (
                        <>
                            <TextInput
                                label="인증번호 입력"
                                placeholder={generatedCode}
                                value={code}
                                onChange={(e) => setCode(e.currentTarget.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                                error={codeError}
                            />

                            <Button fullWidth onClick={handleVerify} color="#00c471">
                                인증 확인
                            </Button>

                            <Text align="center" size="sm" mt={4} c={timeLeft > 0 ? 'gray' : 'red'}>
                                {timeLeft > 0
                                    ? `인증 유효 시간: ${formatTime(timeLeft)}`
                                    : '인증 시간이 만료되었습니다. 다시 요청해 주세요.'}
                            </Text>
                        </>
                    )}
                </Stack>
            )}
        </Box>
    );
}

export default Id;