import { Box, Text } from '@mantine/core';
import CartList from '../components/CartList';

const initialCourses = [
    {
        id: 1,
        title: '[코드캠프] 강력한 CSS',
        instructor: '수코딩',
        price: 22000,
        discountPrice: 16500,
        isDiscounted: true,
    },
    {
        id: 2,
        title: '제대로 파는 HTML CSS - by 얄코',
        price: 44000,
        instructor: '수코딩',
    },
    {
        id: 3,
        title: '웹 개발의 핵심, HTTP 완벽 마스터하기!',
        price: 55000,
        instructor: '수코딩',
    },
];

function Carts() {
    const selectedIds = [];
    const dummyToggle = () => { };
    const dummyDelete = () => { };

    return (
        <Box p="lg" maw={800} mx="auto">
            <Text fw={700} fz={24} mb="lg">
                수강바구니
            </Text>

            <CartList
                courses={initialCourses}
                selectedIds={selectedIds}
                onToggle={dummyToggle}
                onDelete={dummyDelete}
            />

            <CartList
                courses={[]}
                selectedIds={selectedIds}
                onToggle={dummyToggle}
                onDelete={dummyDelete}
            />
        </Box>
    );
}

export default Carts;