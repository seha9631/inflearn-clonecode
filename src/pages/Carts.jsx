import {
    Box,
    Button,
    Checkbox,
    Group,
    Stack,
    Text,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import CartList from '../components/CartList';
import CartSummary from '../components/CartSummary';
import { useAuth } from '../contexts/AuthContext';
import { getCoursesByCodes } from '../utils/courseUtils';

function Carts() {
    const { user, updateUser } = useAuth();
    const [courses, setCourses] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        if (user && user.cart) {
            const courseList = getCoursesByCodes(user.cart);
            setCourses(courseList);
        }
    }, [user]);

    const toggleSelect = (courseCode) => {
        setSelectedIds((prev) =>
            prev.includes(courseCode) ? prev.filter((v) => v !== courseCode) : [...prev, courseCode]
        );
    };

    const handleSelectAll = (checked) => {
        setSelectedIds(checked ? courses.map((c) => c.courseCode) : []);
    };

    const handleDelete = (courseCode) => {
        const updatedCourses = courses.filter((c) => c.courseCode !== courseCode);
        setCourses(updatedCourses);
        setSelectedIds((prev) => prev.filter((v) => v !== courseCode));

        const updatedCart = user.cart.filter((code) => code !== courseCode);
        updateUser({ ...user, cart: updatedCart });
    };

    const handleBulkDelete = () => {
        const updatedCourses = courses.filter((c) => !selectedIds.includes(c.courseCode));
        setCourses(updatedCourses);
        setSelectedIds([]);

        const updatedCart = user.cart.filter((code) => !selectedIds.includes(code));
        updateUser({ ...user, cart: updatedCart });
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