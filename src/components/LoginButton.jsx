import { Button } from '@mantine/core';

function LoginButton({ onLogin }) {
    return (
        <Button
            onClick={onLogin}
            variant='filled'
            size='xs'
            color='green'
        >
            로그인
        </Button>
    );
}

export default LoginButton;