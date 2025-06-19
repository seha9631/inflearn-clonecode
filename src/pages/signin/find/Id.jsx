import {
    Box,
    Button,
    Stack,
    Text,
    TextInput,
    Select,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { COUNTRY_CODES } from '../../../utils/constants';
import { validatePhone } from '../../../utils/validators';

function Id() {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const [generatedCode, setGeneratedCode] = useState('');
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState('');
    const [verified, setVerified] = useState(false);

    const [showVerification, setShowVerification] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

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

        const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedCode(randomCode);
        console.log('인증번호:', randomCode);

        setShowVerification(true);
        setTimeLeft(180);
        setError('');
        setCode('');
        setCodeError('');
        setVerified(false);
    };

    const handleVerify = () => {
        if (timeLeft <= 0) {
            setCodeError('✗ 인증 시간이 만료되었습니다. 다시 요청해 주세요.');
            return;
        }

        if (code.trim() === generatedCode) {
            setVerified(true);
            setCodeError('');
        } else {
            setCodeError('✗ 인증번호가 일치하지 않습니다.');
        }
    };

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    const formatTime = (sec) => {
        const m = String(Math.floor(sec / 60)).padStart(2, '0');
        const s = String(sec % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <Box maw={400} mx="auto" mt={80} mb={80}>
            <Text align="center" fw={700} fz={24} mb={4}>
                아이디(이메일)
            </Text>
            <Text align="center" size="sm" c="dimmed" mb={24}>
                계정에 등록된 휴대폰 번호를 입력하시면
                <br />
                사용 중인 계정의 이메일 주소를 알려드립니다.
            </Text>

            <Stack>
                <Select label="국가 선택" defaultValue="+82" data={COUNTRY_CODES} />

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
                            placeholder={generatedCode || '인증번호'}
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

                {verified && (
                    <Text align="center" mt="md" c="green">
                        인증이 완료되었습니다.
                    </Text>
                )}
            </Stack>
        </Box>
    );
}

export default Id;