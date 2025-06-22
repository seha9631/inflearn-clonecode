import { Stack, Text, Box, ActionIcon, Paper } from '@mantine/core';
import { SIDEBAR_ITEMS } from '../utils/constants';

function LectureSidebar({ show = true, onPanelOpen }) {
    if (!show) return null;

    return (
        <Paper
            shadow='md'
            p='xs'
            radius='md'
            style={{
                position: 'fixed',
                top: '50%',
                right: 12,
                transform: 'translateY(-50%)',
                backgroundColor: 'white',
                zIndex: 1000,
            }}
        >
            <Stack align='center' gap={20}>
                {SIDEBAR_ITEMS.map(({ icon: Icon, label, key }) => (
                    <Box key={key} style={{ textAlign: 'center' }}>
                        <ActionIcon
                            variant='light'
                            color='gray'
                            radius='xl'
                            size='xl'
                            style={{ backgroundColor: 'white' }}
                            onClick={() => onPanelOpen(key)}
                        >
                            <Icon size={24} />
                        </ActionIcon>

                        <Text size='xs' mt={4}>{label}</Text>
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
}

export default LectureSidebar;