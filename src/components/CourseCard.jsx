import { Card, Image, Text, Button, Group, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';

function CourseCard({ courseCode, thumbnail, title, instructor, originalPrice, discountRate, discountPrice }) {
    return (
        <Link to={`/course/${courseCode}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Card shadow='sm' padding='lg' radius='md' withBorder w={300} h={400}>
                <Card.Section>
                    <Image
                        src={thumbnail}
                        height={160}
                    />
                </Card.Section>

                <Stack mt='md' mb='xs'>
                    <Text fz={16} fw={600}>{title}</Text>
                    <Text fz={14} fw={400}>{instructor}</Text>
                </Stack>

                <Group mt='xs' spacing='xs'>
                    {discountRate && discountPrice ? (
                        <Stack gap='xs'>
                            <Text c='gray' td='line-through'>₩{originalPrice.toLocaleString()}</Text>
                            <Group>
                                <Text c='red' fw={700}>{discountRate}%</Text>
                                <Text fw={700}>₩{discountPrice.toLocaleString()}</Text>
                            </Group>
                        </Stack>
                    ) : (
                        <Text fw={700}>₩{originalPrice.toLocaleString()}</Text>
                    )}
                </Group>

                <Group mt='md'>
                    <Button color='#00c471' radius='md'>
                        장바구니
                    </Button>
                    <Button color='#00c471' radius='md'>
                        찜하기
                    </Button>
                </Group>
            </Card>
        </Link >
    );
}

export default CourseCard;