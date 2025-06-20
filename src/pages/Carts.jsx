import {
    Box,
    Button,
    Checkbox,
    Group,
    Stack,
    Text,
} from '@mantine/core';
import { useState } from 'react';
import CartList from '../components/CartList';
import CartSummary from '../components/CartSummary';

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
    const [courses, setCourses] = useState(initialCourses);
    const [selectedIds, setSelectedIds] = useState([]);

    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    const handleDelete = (id) => {
        setCourses((prev) => prev.filter((c) => c.id !== id));
        setSelectedIds((prev) => prev.filter((v) => v !== id));
    };

    const handleSelectAll = (checked) => {
        setSelectedIds(checked ? courses.map((c) => c.id) : []);
    };

    const handleBulkDelete = () => {
        setCourses((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
        setSelectedIds([]);
    };

    return (
        <Box p='lg' maw={800} mx='auto'>
            <Text fw={700} fz={24} mb='lg'>
                수강바구니
            </Text>

            <Group mb='sm'>
                <Checkbox
                    checked={selectedIds.length === courses.length && courses.length > 0}
                    onChange={(e) => handleSelectAll(e.currentTarget.checked)}
                    label={`전체선택 ${selectedIds.length}/${courses.length}`}
                />
                <Button
                    variant='subtle'
                    onClick={handleBulkDelete}
                    disabled={selectedIds.length === 0}
                    bg={selectedIds.length === 0 ? 'lightGray' : 'green'}
                >
                    <Text c='white'>
                        선택삭제
                    </Text>
                </Button>
            </Group>

            <Stack spacing='sm' mb='lg'>
                <CartList
                    courses={courses}
                    selectedIds={selectedIds}
                    onToggle={toggleSelect}
                    onDelete={handleDelete}
                />
            </Stack>

            <CartSummary courses={courses} selectedIds={selectedIds} />
        </Box>
    );
}

export default Carts;
