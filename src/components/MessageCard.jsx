import { Card, Text } from '@mantine/core';

function MessageCard({ message, subMessage, color = 'green.8' }) {
    return (
        <Card withBorder shadow='sm' padding='md' radius='md' bg='green.0'>
            <Text align='center' c={color} fw={600}>
                {message}
            </Text>
            {subMessage && (
                <Text align='center' c='dimmed' size='sm'>
                    {subMessage}
                </Text>
            )}
        </Card>
    );
}

export default MessageCard;