import { Box, Button, Anchor, ScrollArea, Group, Popover, Text, UnstyledButton, ActionIcon, Divider, Stack, Avatar, Image } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PiPlay, PiPlayFill, PiShoppingCart } from 'react-icons/pi';

const cartItems = [
    {
        id: 1,
        title: '[코드캠프] 강력한 CSS',
        price: 16500,
        originalPrice: 22000,
        image: 'https://cdn.inflearn.com/public/courses/329921/cover/325131ea-9c57-427e-98b9-4e207a1dff98/thumbnail-css.png',
        link: '/course/강력-css-코드캠프',
    },
    {
        id: 2,
        title: '제대로 파는 HTML CSS - by 얄코(Yalco)',
        price: 44000,
        image: 'https://cdn.inflearn.com/public/courses/328592/cover/b8957940-b416-4f31-8ae1-1cd2c5b29f3a/HTML-CSS--IFL.png',
        link: '/course/제대로-파는-html-css',
    },
    {
        id: 3,
        title: '웹 개발의 핵심, HTTP 완벽 마스터하기!',
        price: 55000,
        image: 'https://cdn.inflearn.com/public/files/courses/335426/cover/01jxvfgypbh8yb0yn77j9n7vbd',
        link: '/course/웹개발-핵심-http-완벽-마스터하기',
    },
    {
        id: 4,
        title: '프론트엔드 개발환경의 이해와 실습 (webpack, babel, eslint..)',
        price: 69300,
        image: 'https://cdn.inflearn.com/public/courses/324671/course_cover/638eee1a-6381-402d-a17b-3724751414f1/frontend-env-eng.png',
        link: '/course/프론트엔드-개발환경',
    },
    {
        id: 5,
        title: '따라하며 배우는 리액트 테스트 [2023.11 업데이트]',
        price: 49500,
        image: 'https://cdn.inflearn.com/public/courses/327775/cover/0ef9c174-9974-4530-9470-d1ce8648aa75/327775-eng.png',
        link: '/course/따라하는-리액트-테스트',
    },
];

const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

function NavBarRight({ onLogout }) {
    const [hovered, setHovered] = useState(false);
    const [userOpened, setUserOpened] = useState(false);
    const [cartOpened, setCartOpened] = useState(false);
    const couponCount = 5;
    const userPoint = 1000;

    return <>
        <Button variant='default' size='xs' fw={400}>
            <Anchor
                href='https://www.inflearn.com/users/1256904/dashboard'
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
        > {/* 나중에 action icon으로 바꿔야함 */}
            <Anchor
                href='https://www.inflearn.com/'
            >
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
                        총 결제금액 <Text span fw={700} c='black'>{totalPrice.toLocaleString()}</Text>원
                    </Text>
                </Group>

                <Divider mb='sm' />

                <ScrollArea h={280}>
                    <Stack spacing='md'>
                        {cartItems.map((item) => (
                            <Group key={item.id} align='flex-start' spacing='sm'>
                                <Image
                                    src={item.image}
                                    radius='sm'
                                    alt={item.title}
                                    style={{ width: 80, height: 56, objectFit: 'cover' }}
                                />
                                <Box style={{ flex: 1 }}>
                                    <Text size='sm' lineClamp={2}>
                                        {item.title}
                                    </Text>
                                    <Group spacing={4}>
                                        {item.originalPrice && (
                                            <Text size='xs' c='dimmed' td='line-through'>
                                                {item.originalPrice.toLocaleString()}
                                            </Text>
                                        )}
                                        <Text fw={600}>{item.price.toLocaleString()}원</Text>
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
                    <Avatar src='https://cdn.inflearn.com/public/main/profile/default_profile.png' radius='xl' />
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
                        <Group spacing={4}>
                            <Text fw={700}>하상은</Text>
                        </Group>
                        <Text size='xs' c='dimmed'>학생</Text>
                    </Box>
                </Group>

                <Group mt='md'>
                    <Button color='#f1f3f5'>
                        <Link
                            to='user/coupons'
                            style={{
                                textDecoration: 'none',
                                color: 'black'
                            }}
                        >
                            쿠폰 {couponCount}개
                        </Link>
                    </Button>
                    <Button color='#f1f3f5'>
                        <Link
                            to='user/points'
                            style={{ textDecoration: 'none', color: 'black' }}
                        >
                            포인트 {userPoint}
                        </Link>
                    </Button>
                </Group>


                <Divider my='sm' />

                <Box style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Link to='/my/courses' style={{ textDecoration: 'none', color: 'black' }}>
                        내 학습
                    </Link>
                    <Link to='/my/orders' style={{ textDecoration: 'none', color: 'black' }}>
                        구매 내역
                    </Link>
                    <Link to='/my/likes' style={{ textDecoration: 'none', color: 'black' }}>
                        좋아요
                    </Link>
                </Box>

                <Divider my='sm' />

                <Group position='apart'>
                    <UnstyledButton onClick={onLogout}>
                        <Text c='red' fw={500}>
                            로그아웃
                        </Text>
                    </UnstyledButton>
                </Group>
            </Popover.Dropdown>
        </Popover>
    </>
}

export default NavBarRight;