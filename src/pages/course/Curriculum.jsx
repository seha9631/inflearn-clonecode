import {
    Accordion,
    Group,
    Text,
    Badge,
    ThemeIcon,
    Stack,
    Title,
} from '@mantine/core';
import { FaRegPlayCircle } from 'react-icons/fa';
import { formatSeconds, formatSecondsToKorean } from '../../utils/time';
import { Link } from 'react-router-dom';

function Curriculum({ courseCode, sections, lectures, isEnrolled }) {
    return (
        <>
            <Title order={3} mb='md'>커리큘럼</Title>

            <Accordion chevronPosition='left' variant='separated' multiple>
                {sections.map((section, sectionIndex) => {
                    const sectionLectures = lectures.filter(
                        (lecture) => lecture.sectionId === section.id
                    );

                    const sectionDuration = sectionLectures.reduce(
                        (sum, lecture) => sum + (lecture.videoDuration || 0),
                        0
                    );

                    return (
                        <Accordion.Item value={`section-${sectionIndex}`} key={section.id}>
                            <Accordion.Control>
                                <Group justify='space-between'>
                                    <Text fw={600}>{section.title}</Text>
                                    <Text c='dimmed' size='sm'>
                                        {sectionLectures.length}개 강의 · {formatSecondsToKorean(sectionDuration)}
                                    </Text>
                                </Group>
                            </Accordion.Control>

                            <Accordion.Panel>
                                <Stack gap={8}>
                                    {sectionLectures.map((lecture, lectureIndex) => (
                                        <Group key={lectureIndex} justify='space-between'>
                                            <Group>
                                                <ThemeIcon variant='light' size='sm' color='green'>
                                                    <FaRegPlayCircle size={14} />
                                                </ThemeIcon>
                                                {isEnrolled ? (
                                                    <Link
                                                        to={`/course/${courseCode}/${lecture.lectureCode}`}
                                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                                    >
                                                        {lecture.title}
                                                    </Link>
                                                ) : (
                                                    <Text>{lecture.title}</Text>
                                                )}
                                            </Group>

                                            <Badge variant='light' color='gray'>
                                                {formatSeconds(lecture.videoDuration)}
                                            </Badge>
                                        </Group>
                                    ))}
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </>
    );
}

export default Curriculum;