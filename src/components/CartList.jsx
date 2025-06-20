import { Stack, Text } from '@mantine/core';
import CartItem from './CartItem';

function CartList({ courses, selectedIds, onToggle, onDelete }) {
    if (courses.length === 0) {
        return (
            <Text align='center' c='gray' mt={100} mb={100}>
                장바구니에 담긴 강의가 없습니다.
            </Text>
        );
    }

    return (
        <Stack spacing='sm' mb='lg'>
            {courses.map((course) => (
                <CartItem
                    key={course.id}
                    course={course}
                    checked={selectedIds.includes(course.id)}
                    onToggle={() => onToggle(course.id)}
                    onDelete={() => onDelete(course.id)}
                />
            ))}
        </Stack>
    );
}

export default CartList;