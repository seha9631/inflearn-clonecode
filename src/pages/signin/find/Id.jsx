import {
    Box,
    Button,
    Stack,
    Text,
    TextInput,
    Select,
} from '@mantine/core';
import { useState } from 'react';
import { validatePhone } from '../../../utils/validators';
import { COUNTRY_CODES } from '../../../utils/constants.js';

function Id() {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

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

        console.log('인증 요청됨:', phone);
        setError('');
    };

    return (
        <Box maw={400} mx="auto" mt={80} mb={80}>
            <Text align="center" fw={700} fz={24} mb={4}>
                아이디(이메일)
            </Text>
            <Text align="center" size="sm" c="dimmed" mb={24}>
                계정에 등록된 휴대폰 번호를 입력하시면
                <br />사용 중인 계정의 이메일 주소를 알려드립니다.
            </Text>

            <Stack>
                <Select
                    label="국가 선택"
                    defaultValue="+82"
                    data={COUNTRY_CODES}
                />

                <TextInput
                    placeholder="휴대폰 번호 입력"
                    value={phone}
                    onChange={(e) => setPhone(e.currentTarget.value)}
                    error={error}
                />

                <Button fullWidth mt="sm" onClick={handleRequest} color='#00c471'>
                    인증 요청
                </Button>
            </Stack>
        </Box>
    );
}

export default Id;