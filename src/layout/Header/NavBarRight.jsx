import {
    Box,
    Button,
    Anchor,
    ScrollArea,
    Group,
    Popover,
    Text,
    UnstyledButton,
    ActionIcon,
    Divider,
    Stack,
    Avatar,
    Image,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PiPlay, PiPlayFill, PiShoppingCart } from 'react-icons/pi';
import { useAuth } from '../../contexts/AuthContext';
import { getCoursesByCodes } from '../../utils/courseUtils';

function NavBarRight({ onLogout }) {
    const [hovered, setHovered] = useState(false);
    const [userOpened, setUserOpened] = useState(false);
    const [cartOpened, setCartOpened] = useState(false);
    const { user } = useAuth();

    const cartItemCodes = user?.cart ?? [];
    const couponCount = user?.coupon?.length ?? 0;
    const userPoint = user?.point ?? 0;

    const cartItems = getCoursesByCodes(cartItemCodes);
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + (item.discountPrice ?? item.originalPrice ?? 0),
        0
    );

    return (
        <>
            <Button variant='default' size='xs' fw={400}>
                <Anchor
                    href='https://www.inflearn.com/users/dashboard'
                    fz={20}
                    fw={500}
                    size='lg'
                    underline='never'
                    c='dark'
                >
                    대시보드
                </Anchor>
            </Button>

            <UnstyledButton
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Anchor href='https://www.inflearn.com/'>
                    {hovered ? (
                        <PiPlayFill size={20} color='#00c471' />
                    ) : (
                        <PiPlay size={20} color='#495057' />
                    )}
                </Anchor>
            </UnstyledButton>

            <Popover
                width={400}
                position='bottom-end'
                withArrow
                shadow='md'
                opened={cartOpened}
                onChange={setCartOpened}
            >
                <Popover.Target>
                    <ActionIcon
                        variant='transparent'
                        onClick={() => setCartOpened((o) => !o)}
                        size='md'
                        radius='md'
                    >
                        <PiShoppingCart size={20} color={cartOpened ? '#00c471' : '#495057'} />
                    </ActionIcon>
                </Popover.Target>

                <Popover.Dropdown style={{ borderRadius: 8, padding: 16 }}>
                    <Group position='apart' mb='sm'>
                        <Text fw={700} size='lg'>
                            수강바구니 <Text span c='green'>{cartItems.length}</Text>
                        </Text>
                        <Text size='sm' c='dimmed'>
                            총 결제금액 <Text span fw={700} c='black'>{totalPrice}</Text>원
                        </Text>
                    </Group>

                    <Divider mb='sm' />

                    <ScrollArea h={280}>
                        <Stack spacing='md'>
                            {cartItems.map((item) => (
                                <Group key={item.id} align='flex-start' spacing='sm'>
                                    <Image
                                        src={item.thumbnail}
                                        radius='sm'
                                        alt={item.title}
                                        style={{ width: 80, height: 56, objectFit: 'cover' }}
                                    />
                                    <Box style={{ flex: 1 }}>
                                        <Text size='sm' lineClamp={2}>
                                            {item.title}
                                        </Text>
                                        <Group spacing={4}>
                                            {item.discountPrice && (
                                                <Text size='xs' c='dimmed' td='line-through'>
                                                    {item.originalPrice.toLocaleString()}원
                                                </Text>
                                            )}
                                            <Text fw={600}>
                                                {(item.discountPrice ?? item.originalPrice)?.toLocaleString()}원
                                            </Text>
                                        </Group>
                                    </Box>
                                </Group>
                            ))}
                        </Stack>
                    </ScrollArea>

                    <Button fullWidth mt='md' radius='md' color='green' component={Link} to='/carts'>
                        수강바구니에서 전체보기
                    </Button>
                </Popover.Dropdown>
            </Popover>

            <Popover
                width={280}
                position='bottom-end'
                withArrow
                shadow='md'
                opened={userOpened}
                onChange={setUserOpened}
            >
                <Popover.Target>
                    <UnstyledButton onClick={() => setUserOpened((o) => !o)}>
                        <Avatar
                            src='https://cdn.inflearn.com/public/main/profile/default_profile.png'
                            radius='xl'
                        />
                    </UnstyledButton>
                </Popover.Target>

                <Popover.Dropdown>
                    <Group spacing='sm'>
                        <Avatar
                            src='https://cdn.inflearn.com/public/main/profile/default_profile.png'
                            radius='xl'
                            size='lg'
                        />
                        <Box>
                            <Text fw={700}>{user?.name ?? '로그인 필요'}</Text>
                            <Text size='xs' c='dimmed'>학생</Text>
                        </Box>
                    </Group>

                    <Group mt='md'>
                        <Button color='#f1f3f5'>
                            <Link to='/user/coupons' style={{ textDecoration: 'none', color: 'black' }}>
                                쿠폰 {couponCount}개
                            </Link>
                        </Button>
                        <Button color='#f1f3f5'>
                            <Link to='/user/points' style={{ textDecoration: 'none', color: 'black' }}>
                                포인트 {userPoint}
                            </Link>
                        </Button>
                    </Group>

                    <Divider my='sm' />

                    <Box style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <Link to='/my/courses' style={{ textDecoration: 'none', color: 'black' }}>내 학습</Link>
                        <Link to='/my/orders' style={{ textDecoration: 'none', color: 'black' }}>구매 내역</Link>
                        <Link to='/my/likes' style={{ textDecoration: 'none', color: 'black' }}>좋아요</Link>
                    </Box>

                    <Divider my='sm' />

                    <Group position='apart'>
                        <UnstyledButton onClick={onLogout}>
                            <Text c='red' fw={500}>로그아웃</Text>
                        </UnstyledButton>
                    </Group>
                </Popover.Dropdown>
            </Popover>
        </>
    );
}

export default NavBarRight;