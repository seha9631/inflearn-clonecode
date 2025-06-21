import { Accordion, Drawer, ScrollArea, Text, Stack, Box } from '@mantine/core';
import { Link } from 'react-router-dom';
import { formatSeconds } from '../utils/time';

function CurriculumPanel({ opened, onClose, course, isEnrolled }) {
    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            title={<Text size="lg" fw={700}>커리큘럼</Text>}
            position="right"
            size="sm"
            padding="md"
        >
            <ScrollArea h="calc(100vh - 100px)">
                <Accordion chevronPosition="left" variant="separated" multiple>
                    {course.sections.map((section, idx) => (
                        <Accordion.Item key={idx} value={`section-${idx}`}>
                            <Accordion.Control>
                                <Text fw={600}>{section.title}</Text>
                            </Accordion.Control>
                            <Accordion.Panel >
                                {section.lectures.map((lec, lecIdx) => (
                                    <Box h={50}>
                                        <Stack key={lecIdx} gap={0} >
                                            {isEnrolled ? (
                                                <Link
                                                    to={`/course/${course.courseCode}/${lec.lectureCode}`}
                                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                                >
                                                    <Text size="sm">{lec.title}</Text>
                                                </Link>
                                            ) : (
                                                <Text size="sm" c="dimmed">{lec.title}</Text>
                                            )}
                                            <Text c="gray" size="sm">
                                                {formatSeconds(lec.videoDuration)}
                                            </Text>
                                        </Stack>
                                    </Box>
                                ))}
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </ScrollArea>
        </Drawer>
    );
}

export default CurriculumPanel;