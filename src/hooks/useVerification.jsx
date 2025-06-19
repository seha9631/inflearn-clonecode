import { useState, useEffect } from 'react';

function useVerification() {
    const [generatedCode, setGeneratedCode] = useState('');
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState('');
    const [verified, setVerified] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const generateCode = () => {
        const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedCode(randomCode);
        setTimeLeft(180);
        setCode('');
        setCodeError('');
        setVerified(false);
        console.log('Generated verification code:', randomCode);
    };

    const verifyCode = () => {
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

    return {
        code,
        setCode,
        codeError,
        verified,
        timeLeft,
        formatTime,
        generateCode,
        verifyCode,
        generatedCode,
    };
}

export default useVerification;