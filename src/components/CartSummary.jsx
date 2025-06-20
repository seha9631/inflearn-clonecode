import {
    Box,
    Button,
    Divider,
    Paper,
    Stack,
    Text,
} from '@mantine/core';

function CartSummary({ courses, selectedIds }) {
    const selectedCourses = courses.filter((course) =>
        selectedIds.includes(course.id)
    );

    const totalOriginalPrice = selectedCourses.reduce(
        (sum, c) => sum + c.price,
        0
    );

    const totalDiscountPrice = selectedCourses.reduce(
        (sum, c) => sum + (c.discountPrice ?? c.price),
        0
    );

    const discount = totalOriginalPrice - totalDiscountPrice;

    return (
        <Paper withBorder shadow='xs' radius='md' p='md'>
            <Stack spacing='xs'>
                <Text fw={700}>결제정보</Text>

                <Box>
                    <Text size='sm' c='dimmed'>
                        선택상품금액
                    </Text>
                    <Text fw={600}>{totalOriginalPrice.toLocaleString()}원</Text>
                </Box>

                {discount > 0 && (
                    <Box>
                        <Text size='sm' c='dimmed'>
                            할인금액
                        </Text>
                        <Text fw={600} c='red'>
                            -{discount.toLocaleString()}원
                        </Text>
                    </Box>
                )}

                <Divider my='sm' />

                <Box>
                    <Text size='sm' c='dimmed'>
                        총 결제 금액
                    </Text>
                    <Text fw={700} fz='lg' c='green'>
                        {totalDiscountPrice.toLocaleString()}원
                    </Text>
                </Box>

                <Button color='green' fullWidth disabled={selectedCourses.length === 0}>
                    결제하기
                </Button>
            </Stack>
        </Paper>
    );
}

export default CartSummary;