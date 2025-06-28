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
import { useLocation } from 'react-router-dom';
import useUpdateUserCourseMeta from '../../hooks/useUpdateUserCourseMeta';
import supabase from '../../lib/supabaseClient';
import useUserCoursesByType from '../../hooks/useCoursesByType';

function CartsPage() {
    const location = useLocation();
    const [cartItems, setcartItems] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const { courses: cartCourses, loading, error } = useUserCoursesByType('cart');
    const { removeCourseMeta, addCourseMeta } = useUpdateUserCourseMeta();

    useEffect(() => {
        if (cartCourses) {
            setcartItems(cartCourses);

            if (location.state?.selectedCourse) {
                setSelectedIds([location.state.selectedCourse]);
            }
        }
    }, [location.state, cartCourses]);

    if (loading) return <Text>로딩 중입니다...</Text>;
    if (error) return <Text>에러가 발생했습니다: {error.message}</Text>;

    const toggleSelect = (courseCode) => {
        setSelectedIds((prev) =>
            prev.includes(courseCode)
                ? prev.filter((v) => v !== courseCode)
                : [...prev, courseCode]
        );
    };

    const handleSelectAll = (checked) => {
        setSelectedIds(checked ? cartItems.map((c) => c.courseCode) : []);
    };

    const handleDelete = async (courseCode) => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const success = await removeCourseMeta({
            userId: user.id,
            courseCodes: [courseCode],
            type: 'cart',
        });

        if (success) {
            const updatedCourses = cartItems.filter((c) => c.courseCode !== courseCode);
            setcartItems(updatedCourses);
            setSelectedIds((prev) => prev.filter((v) => v !== courseCode));
        }
    };

    const handleBulkDelete = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const success = await removeCourseMeta({
            userId: user.id,
            courseCodes: selectedIds,
            type: 'cart',
        });

        if (success) {
            const updatedCourses = cartItems.filter((c) => !selectedIds.includes(c.courseCode));
            setcartItems(updatedCourses);
            setSelectedIds([]);
        }
    };

    const handlePurchase = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const enrollResults = await Promise.all(
            selectedIds.map((courseCode) =>
                addCourseMeta({ userId: user.id, courseCode, type: 'enrolled' })
            )
        );

        const removeResult = await removeCourseMeta({
            userId: user.id,
            courseCodes: selectedIds,
            type: 'cart',
        });

        if (removeResult && enrollResults.every(Boolean)) {
            const updatedCourses = cartItems.filter(
                (course) => !selectedIds.includes(course.courseCode)
            );
            setcartItems(updatedCourses);
            setSelectedIds([]);
        }
    };

    return (
        <Box p='lg' maw={800} mx='auto'>
            <Text fw={700} fz={24} mb='lg'>
                수강바구니
            </Text>

            <Group mb='sm'>
                <Checkbox
                    checked={selectedIds.length === cartItems.length && cartItems.length > 0}
                    onChange={(e) => handleSelectAll(e.currentTarget.checked)}
                    label={`전체선택 ${selectedIds.length}/${cartItems.length}`}
                />

                <Button
                    variant='subtle'
                    onClick={handleBulkDelete}
                    disabled={selectedIds.length === 0}
                    bg={selectedIds.length === 0 ? 'lightGray' : 'green'}
                >
                    <Text c='white'>선택삭제</Text>
                </Button>
            </Group>

            <Stack spacing='sm' mb='lg'>
                <CartList
                    courses={cartItems}
                    selectedIds={selectedIds}
                    onToggle={toggleSelect}
                    onDelete={handleDelete}
                />
            </Stack>

            <CartSummary
                courses={cartItems}
                selectedIds={selectedIds}
                onPurchase={handlePurchase}
            />
        </Box>
    );
}

export default CartsPage;