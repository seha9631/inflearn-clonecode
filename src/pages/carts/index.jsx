import {
    Box,
    Button,
    Checkbox,
    Group,
    Stack,
    Text,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import CartList from './CartList';
import CartSummary from './CartSummary';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import useCourses from '../../hooks/useCourses';
import { DEFAULT_COURSE_QUERY } from '../../utils/constants';

function CartsPage() {
    const { user, updateUser } = useAuth();
    const location = useLocation();
    const [cartCourses, setCartCourses] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const { courses, loading, error } = useCourses(DEFAULT_COURSE_QUERY);

    useEffect(() => {
        if (user?.cart) {
            const courseList = courses.filter(course =>
                user.cart.includes(course.courseCode)
            );
            setCartCourses(courseList);

            if (location.state?.selectedCourse) {
                setSelectedIds([location.state.selectedCourse]);
            }
        }
    }, [user, location.state, courses]);

    if (loading) {
        return <Text>로딩 중입니다...</Text>;
    }

    if (error) {
        return <Text>에러가 발생했습니다: {error.message}</Text>;
    }

    const toggleSelect = (courseCode) => {
        setSelectedIds((prev) =>
            prev.includes(courseCode) ? prev.filter((v) => v !== courseCode) : [...prev, courseCode]
        );
    };

    const handleSelectAll = (checked) => {
        setSelectedIds(checked ? cartCourses.map((c) => c.courseCode) : []);
    };

    const handleDelete = (courseCode) => {
        const updatedCourses = cartCourses.filter((c) => c.courseCode !== courseCode);
        setCartCourses(updatedCourses);
        setSelectedIds((prev) => prev.filter((v) => v !== courseCode));

        const updatedCart = user.cart.filter((code) => code !== courseCode);
        updateUser({ ...user, cart: updatedCart });
    };

    const handleBulkDelete = () => {
        const updatedCourses = cartCourses.filter((c) => !selectedIds.includes(c.courseCode));
        setCartCourses(updatedCourses);
        setSelectedIds([]);

        const updatedCart = user.cart.filter((code) => !selectedIds.includes(code));
        updateUser({ ...user, cart: updatedCart });
    };

    const handlePurchase = () => {
        const enrolledCourses = selectedIds;
        const updatedCart = cartCourses
            .filter(course => !selectedIds.includes(course.courseCode))
            .map(course => course.courseCode);

        const updatedUser = {
            ...user,
            cart: updatedCart,
            enrolled: [...(user.enrolled || []), ...enrolledCourses],
        };

        updateUser(updatedUser);
        setSelectedIds([]);
    }

    return (
        <Box p='lg' maw={800} mx='auto'>
            <Text fw={700} fz={24} mb='lg'>
                수강바구니
            </Text>

            <Group mb='sm'>
                <Checkbox
                    checked={selectedIds.length === cartCourses.length && cartCourses.length > 0}
                    onChange={(e) => handleSelectAll(e.currentTarget.checked)}
                    label={`전체선택 ${selectedIds.length}/${cartCourses.length}`}
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
                    courses={cartCourses}
                    selectedIds={selectedIds}
                    onToggle={toggleSelect}
                    onDelete={handleDelete}
                />
            </Stack>

            <CartSummary courses={cartCourses} selectedIds={selectedIds} onPurchase={handlePurchase} />
        </Box>
    );
}

export default CartsPage;