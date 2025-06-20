import { Link, useParams } from "react-router-dom";

import {
    Tabs,
    Box,
    Container,
    Title,
    Text,
    Group,
    Stack,
    Image,
    Anchor
} from '@mantine/core';

function Course() {
    const isEnrolled = false;
    const params = useParams();

    return (
        <Container size="lg">
            <Box mb="md" bg="black">
                <Group justify="space-between">
                    <Stack>
                        <Anchor
                            component={Link}
                            to="/courses/it-programming"
                            underline="always"
                            c='white'
                            ml={12}
                            style={{
                                textDecorationColor: 'white',
                            }}
                        >
                            개발 · 프로그래밍
                        </Anchor>
                        <Title c="white" order={2} ml={12}>타입스크립트로 배우는 리액트(React.js) : 기초부터 최신 기술까지 완벽하게</Title>
                        <Text c="white" size="sm" ml={16}>
                            {params.id} 강의 짧은 소개
                        </Text>
                    </Stack>
                    <Image
                        src="https://cdn.inflearn.com/public/files/courses/336365/cover/01jwp2td4xrh4szbxwa1m9qptn?w=420"
                        radius='sm'
                        alt="타입스크립트로 배우는 리액트(React.js) : 기초부터 최신 기술까지 완벽하게"
                        style={{ width: 300, height: 200, objectFit: 'cover' }}
                    />
                </Group>
            </Box>

            <Tabs defaultValue={isEnrolled ? "dashboard" : "description"} keepMounted={false} color='#00c471'>
                <Tabs.List>
                    {isEnrolled && (
                        <Tabs.Tab value="dashboard">대시보드</Tabs.Tab>
                    )}
                    <Tabs.Tab value="description">강의 소개</Tabs.Tab>
                    {!isEnrolled && (
                        <Tabs.Tab value="curriculum">커리큘럼</Tabs.Tab>
                    )}
                </Tabs.List>

                <Tabs.Panel value="description" pt="md">
                    <Stack gap={2}>
                        <Text style={{ fontSize: 25 }}>{ }를 위해 준비한</Text>
                        <Text style={{ fontSize: 25 }}>{ } 강의입니다.</Text>
                        <Box h={800}
                            p="md"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{ fontSize: 50 }}>{params.id} 강의 소개</Text>
                        </Box>
                    </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="curriculum" pt="md">
                    <Title>커리큘럼</Title>
                    커리큘럼 : 나중에 강의 데이터를 업데이트하면 구현
                </Tabs.Panel>

                <Tabs.Panel value="reviews" pt="md">
                    대시보드 : 나중에 강의 데이터를 업데이트하면 구현
                </Tabs.Panel>


            </Tabs>
        </Container>
    );
}

export default Course;