import {
    Box,
    Button,
    PasswordInput,
    Stack,
    Text,
    Card,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import supabase from '../../../lib/supabaseClient';
import { validatePassword, validateConfirmPassword } from '../../../utils/validators';
import useFormRedirect from '../../../hooks/useFormRedirect';

function Password() {
    const [searchParams] = useSearchParams();
    const { scheduleRedirect } = useFormRedirect('/');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [confirmError, setConfirmError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('access_token');
        const type = searchParams.get('type');

        if (token && type === 'recovery') {
            supabase.auth.setSession({
                access_token: token,
                refresh_token: '',
            });
        }
    }, [searchParams]);

    const handleSubmit = async () => {
        const passwordResult = validatePassword(password);
        const confirmResult = validateConfirmPassword(password, confirmPassword);

        setPasswordErrors(passwordResult.messages);
        setConfirmError(confirmResult.message);

        if (!passwordResult.isValid || !confirmResult.isValid) return;

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setErrorMessage('비밀번호 변경 중 오류가 발생했습니다.');
            return;
        }

        setSuccessMessage('비밀번호가 성공적으로 변경되었습니다. 로그인해주세요.');
        scheduleRedirect();
    };

    return (
        <Box maw={400} mx="auto">
            <h2>비밀번호 변경</h2>

            {successMessage && (
                <Card withBorder shadow="sm" mb="md" padding="md" radius="md" bg="green.0">
                    <Text c="green.8" fw={600}>{successMessage}</Text>
                </Card>
            )}

            {errorMessage && (
                <Card withBorder shadow="sm" mb="md" padding="md" radius="md" bg="red.0">
                    <Text c="red.8" fw={600}>{errorMessage}</Text>
                </Card>
            )}

            <Stack>
                <PasswordInput
                    label="새 비밀번호"
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

                <Button fullWidth mt="md" onClick={handleSubmit} color="green">
                    비밀번호 변경
                </Button>
            </Stack>
        </Box>
    );
}

export default Password;