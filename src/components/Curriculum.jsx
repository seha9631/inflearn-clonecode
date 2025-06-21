import {
    Accordion,
    Group,
    Text,
    Badge,
    ThemeIcon,
    Stack
} from '@mantine/core';
import { FaRegPlayCircle } from 'react-icons/fa';
import { formatSeconds } from '../utils/timeFormat';


function Curriculum({ sections }) {
    return (
        <Accordion chevronPosition='left' variant='separated' multiple>
            {sections.map((section, sectionIndex) => (
                <Accordion.Item value={`section-${sectionIndex}`} key={sectionIndex}>
                    <Accordion.Control>
                        <Group justify='space-between'>
                            <Text fw={600}>{section.title}</Text>
                            <Text c='dimmed' size='sm'>
                                {section.lectures.length}개 강의
                            </Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Stack gap={8}>
                            {section.lectures.map((lecture, lectureIndex) => (
                                <Group key={lectureIndex} justify='space-between'>
                                    <Group>
                                        <ThemeIcon variant='light' size='sm' color='green'>
                                            <FaRegPlayCircle size={14} />
                                        </ThemeIcon>
                                        <Text>{lecture.title}</Text>
                                    </Group>
                                    <Badge variant='light' color='gray'>
                                        {formatSeconds(lecture.videoDuration)}
                                    </Badge>
                                </Group>
                            ))}
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}

export default Curriculum;