import {
    Modal,
    TextInput,
    PasswordInput,
    Button,
    Group,
    Stack,
    Image,
    Text
} from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom'

export default function LoginModal({ opened, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={<Image src="https://cdn.inflearn.com/assets/brand/logo.png" alt="Inflearn" height={40} fit="contain" />}
            centered
            withCloseButton
            radius="md"
            size="sm"
            overlayProps={{ blur: 3 }}
        >
            <Stack spacing="xs">
                <TextInput
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <PasswordInput
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />

                <Button fullWidth radius="md" color="green">
                    로그인
                </Button>

                <Group position="apart" spacing="xs" mt="xs">
                    <Link to='/signin/find/password' onClick={onClose}>
                        <Text fz='xs' c='black'>
                            비밀번호 찾기
                        </Text>
                    </Link>
                    <Link to='/signup' onClick={onClose}>
                        <Text fz='xs' c='black'>
                            회원가입
                        </Text>
                    </Link>
                    <Link to='/signin/find/id' onClick={onClose}>
                        <Text fz='xs' c='black'>
                            아이디(이메일) 찾기
                        </Text>
                    </Link>
                </Group>
            </Stack>
        </Modal>
    );
}