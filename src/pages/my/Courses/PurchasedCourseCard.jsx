import { Card, Image, Text, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';

function PurchasedCourseCard({ courseCode, thumbnailUrl, title }) {
    return (
        <Link to={`/course/${courseCode}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder w={250} h={280}>
                <Card.Section>
                    <Image src={thumbnailUrl} height={160} />
                </Card.Section>

                <Stack mt="md" gap={2}>
                    <Text fz="md" fw={600}>
                        {title}
                    </Text>
                </Stack>
            </Card>
        </Link>
    );
}

export default PurchasedCourseCard;