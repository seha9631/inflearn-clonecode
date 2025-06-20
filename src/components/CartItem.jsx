import {
    Card,
    Group,
    Text,
    Checkbox,
    CloseButton,
    Stack,
} from '@mantine/core';

function CartItem({ course, checked, onToggle, onDelete }) {
    return (
        <Card withBorder p='md' radius='md' shadow='xs'>
            <Group justify='space-between'>
                <Group>
                    <Checkbox checked={checked} onChange={onToggle} />
                    <div>
                        <Stack gap={0} mb='sm'>
                            <Text fw={600}>{course.title}</Text>
                            <Text fz='sm' fw={400}>{course.instructor}</Text>
                        </Stack>
                        <Text size='sm' c='gray' fw={500}>
                            {course.isDiscounted ? (
                                <>
                                    <Text span c='red' fw={700}>
                                        {Math.round(((course.price - course.discountPrice) / course.price) * 100)}%
                                    </Text>{' '}
                                    <Text span td='line-through'>{course.price.toLocaleString()}</Text>{' '}
                                    <Text span fw={500}>{course.discountPrice.toLocaleString()}</Text>
                                </>
                            ) : (
                                `${course.price.toLocaleString()}`
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