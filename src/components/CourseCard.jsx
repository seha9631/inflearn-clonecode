import { Card, Image, Text, Group, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';
import CartToggleButton from './CartToggleButton';
import WishlistToggleButton from './WishlistToggleButton';
import useEnrollmentCheck from '../hooks/useEnrollmentCheck';

function CourseCard({ course_code, thumbnail_url, title, instructor, level, original_price, discount_rate, discount_price }) {
    const isEnrolled = useEnrollmentCheck(course_code);

    return (
        <Link to={`/course/${course_code}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Card shadow='sm' padding='lg' radius='md' withBorder w={250} h={400}>
                <Card.Section>
                    <Image
                        src={thumbnail_url}
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
                        {discount_rate && discount_price ? (
                            <Stack gap={0}>
                                <Text c='gray' td='line-through'>₩{original_price.toLocaleString()}</Text>
                                <Group>
                                    <Text c='red' fw={700}>{discount_rate}%</Text>
                                    <Text fw={700}>₩{discount_price.toLocaleString()}</Text>
                                </Group>
                            </Stack>
                        ) : (
                            <Text fw={700}>₩{original_price.toLocaleString()}</Text>
                        )}
                    </Group>
                </Stack>

                {!isEnrolled && (
                    <Group mt='md'>
                        <CartToggleButton
                            course_code={course_code}
                            title={title}
                            originalPrice={original_price}
                            discountPrice={discount_price}
                            discountRate={discount_rate}
                        />
                        <WishlistToggleButton
                            course_code={course_code}
                            title={title}
                            originalPrice={original_price}
                            discountPrice={discount_price}
                            discountRate={discount_rate}
                        />
                    </Group>
                )}
            </Card>
        </Link >
    );
}

export default CourseCard;