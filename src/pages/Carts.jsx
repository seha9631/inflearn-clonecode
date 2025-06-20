import {
    Box,
    Button,
    Checkbox,
    Group,
    Stack,
    Text,
} from '@mantine/core';
import { useState } from 'react';
import CartItem from '../components/CartItem';

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

    const course = courses[0];

    return (
        <Box p="lg" maw={800} mx="auto">
            <Text fw={700} fz={24} mb="lg">
                수강바구니
            </Text>

            <CartItem
                course={course}
                checked={selectedIds.includes(course.id)}
                onToggle={() => toggleSelect(course.id)}
                onDelete={() => handleDelete(course.id)}
            />
        </Box>
    );
}

export default Carts;