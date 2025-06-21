import { Card, Image, Text, Button, Group, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';
import CartToggleButton from './CartToggleButton'

function CourseCard({ courseCode, thumbnail, title, instructor, level, originalPrice, discountRate, discountPrice }) {
    return (
        <Link to={`/course/${courseCode}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Card shadow='sm' padding='lg' radius='md' withBorder w={250} h={400}>
                <Card.Section>
                    <Image
                        src={thumbnail}
                        height={160}
                    />
                </Card.Section>

                <Stack mt='md' mb='xs' gap={2}>
                    <Text fz='md' fw={600}>{title}</Text>
                    <Group justify='space-between'>
                        <Text fz='sm' fw={400}>{instructor}</Text>
                        <Text fz='xs' fw={400}>{level}</Text>
                    </Group>


                    <Group mt='xs' spacing='xs'>
                        {discountRate && discountPrice ? (
                            <Stack gap={0}>
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
                </Stack>

                <Group mt='md'>
                    <CartToggleButton
                        courseCode={courseCode}
                        title={title}
                        originalPrice={originalPrice}
                        discountPrice={discountPrice}
                        discountRate={discountRate}
                    />
                    <Button color='#00c471' radius='md'>
                        찜하기
                    </Button>
                </Group>
            </Card>
        </Link >
    );
}

export default CourseCard;