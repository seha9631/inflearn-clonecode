import { Box } from '@mantine/core';

function ChannelTalkButton() {
    return (
        <Box
            component='a'
            href='https://www.inflearn.com/channeltalk'
            target='_blank'
            rel='noreferrer'
            style={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 1000,
            }}
        >
            <img
                src='https://cdn.inflearn.com/assets/channeltalk/channeltalk.png?w=314'
                alt='채널톡 아이콘'
                style={{ width: 157, height: 74 }}
            />
        </Box>
    );
}

export default ChannelTalkButton;