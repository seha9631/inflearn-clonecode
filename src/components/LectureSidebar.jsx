import { Stack, Text, Box, ActionIcon, Paper } from '@mantine/core';
import {
    IconListDetails,
    IconMessageQuestion,
    IconNotes,
    IconWorld
} from '@tabler/icons-react';

const sidebarItems = [
    { icon: IconListDetails, label: '커리큘럼', key: 'curriculum' },
    { icon: IconMessageQuestion, label: '질문&답변', key: 'qa' },
    { icon: IconNotes, label: '노트', key: 'notes' },
    { icon: IconWorld, label: '글로벌', key: 'global' },
];

function LectureSidebar({ show = true, onPanelOpen }) {
    if (!show) return null;

    return (
        <Paper
            shadow="md"
            p="xs"
            radius="md"
            style={{
                position: 'fixed',
                top: '50%',
                right: 12,
                transform: 'translateY(-50%)',
                backgroundColor: 'white',
                zIndex: 1000,
            }}
        >
            <Stack align="center" gap={20}>
                {sidebarItems.map(({ icon: Icon, label, key }) => (
                    <Box key={key} style={{ textAlign: 'center' }}>
                        <ActionIcon
                            variant="light"
                            color="gray"
                            radius="xl"
                            size="xl"
                            style={{ backgroundColor: 'white' }}
                            onClick={() => onPanelOpen(key)}
                        >
                            <Icon size={24} />
                        </ActionIcon>
                        <Text size="xs" mt={4}>{label}</Text>
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
}

export default LectureSidebar;