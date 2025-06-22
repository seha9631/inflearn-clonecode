import {
    Card,
    Group,
    Text,
    Checkbox,
    CloseButton,
    Stack,
    Image
} from '@mantine/core';

function CartItem({ course, checked, onToggle, onDelete }) {
    const isDiscounted = !(course.discountRate === null);
    return (
        <Card
            withBorder
            p='md'
            radius='md'
            shadow='xs'
            style={{
                opacity: checked ? 1 : 0.5,
                transition: 'opacity 0.3s ease',
            }}
        >
            <Group justify='space-between'>
                <Group>
                    <Checkbox checked={checked} onChange={onToggle} />

                    <Image
                        src={course.thumbnail}
                        radius='sm'
                        alt={course.title}
                        style={{ width: 80, height: 56, objectFit: 'cover' }}
                    />

                    <div>
                        <Stack gap={0} mb='sm'>
                            <Text fw={600}>{course.title}</Text>
                            <Text fz='sm' fw={400}>{course.instructor}</Text>
                        </Stack>

                        <Text size='sm' c='gray' fw={500}>
                            {isDiscounted ? (
                                <>
                                    <Text span c='red' fw={700}>
                                        {course.discountRate}%
                                    </Text>{' '}
                                    <Text span td='line-through'>{course.originalPrice}</Text>{' '}
                                    <Text span fw={500}>{course.discountPrice}</Text>
                                </>
                            ) : (
                                `${course.originalPrice}`
                            )}
                        </Text>
                    </div>
                </Group>

                <CloseButton onClick={onDelete} size='md' />
            </Group>
        </Card>
    );
}

export default CartItem;