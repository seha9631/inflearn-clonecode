import { Group, Menu, Text, Anchor } from '@mantine/core';
import { HiOutlineChatAlt, HiOutlineChatAlt2, HiOutlineBookOpen } from 'react-icons/hi';
import { FaLaptopCode, FaChevronRight, FaRegStar, FaRegLightbulb } from 'react-icons/fa6';
import { TbCalendarStats } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import classes from './NavBarLeft.module.css';

function NavBarLeft() {
    return (
        <Group spacing='lg'>
            <Menu
                trigger='hover'
                width={180}
                position='bottom-start'
                openDelay={100}
                closeDelay={400}
                withArrow
                arrowSize={15}
                arrowOffset={18}
            >
                <Menu.Target>
                    <Link to='/courese' style={{ textDecoration: 'none' }}>
                        <Text
                            fz={16}
                            fw={700}
                            underline='never'
                            className={classes['HoverGreen']}
                        >
                            강의
                        </Text>
                    </Link>


                </Menu.Target>
                <Menu.Dropdown className={classes['SharpBorder']}>
                    <Menu.Sub width={180}>
                        <Menu.Sub.Target>
                            <Menu.Sub.Item rightSection>개발 · 프로그래밍</Menu.Sub.Item>
                        </Menu.Sub.Target>

                        <Menu.Sub.Dropdown
                            className={classes['SharpBorder']}
                            style={{
                                marginTop: `${0 * -35 - 5}px`,
                                marginLeft: '4px'
                            }}
                        >
                            <Menu.Item>웹 개발</Menu.Item>
                            <Menu.Item>프론트엔드</Menu.Item>
                        </Menu.Sub.Dropdown>
                    </Menu.Sub>
                    <Menu.Sub width={180}>
                        <Menu.Sub.Target>
                            <Menu.Sub.Item rightSection>게임 개발</Menu.Sub.Item>
                        </Menu.Sub.Target>

                        <Menu.Sub.Dropdown
                            className={classes['SharpBorder']}
                            style={{
                                marginTop: `${1 * -35 - 5}px`,
                                marginLeft: '4px'
                            }}
                        >
                            <Menu.Item>웹 개발</Menu.Item>
                            <Menu.Item>프론트엔드</Menu.Item>
                        </Menu.Sub.Dropdown>
                    </Menu.Sub>
                    <Menu.Divider />
                    <Menu.Item
                        leftSection={<TbCalendarStats size={18} />}
                        rightSection={<FaChevronRight size={18} />}
                    >
                        모임/부트캠프
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>

            <Anchor
                href='https://www.inflearn.com/roadmaps'
                fz={16}
                fw={700}
                underline='never'
                className={classes['HoverGreen']}
            >
                로드맵
            </Anchor>
            <Anchor
                href='https://mentoring.inflearn.com/mentors'
                fz={16}
                fw={700}
                underline='never'
                className={classes['HoverGreen']}
            >
                멘토링
            </Anchor>
            <Menu
                trigger='hover'
                openDelay={100}
                closeDelay={400}
                position='bottom-end'
                styles={{
                    dropdown: {
                        marginLeft: '-28px',
                    },
                }}
                withArrow
                arrowSize={15}
                arrowOffset={80}
            >
                <Menu.Target>
                    <Link
                        to='/community/questions'
                        style={{ textDecoration: 'none' }}
                    >
                        <Text
                            fz={16}
                            fw={700}
                            underline='never'
                            className={classes['HoverGreen']}
                        >
                            커뮤니티
                        </Text>
                    </Link>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item
                        leftSection={<HiOutlineChatAlt2 size={14} />}
                    >
                        <Anchor
                            href='https://www.inflearn.com/courses?types=ONLINE'
                            fz={14}
                            underline='never'
                            className={classes['HoverBlack']}
                        >
                            질문 & 답변
                        </Anchor>
                    </Menu.Item>
                    <Menu.Item
                        leftSection={<HiOutlineChatAlt size={14} />}
                    >
                        고민있어요
                    </Menu.Item>
                    <Menu.Item
                        leftSection={<HiOutlineBookOpen size={14} />}
                    >
                        스터디
                    </Menu.Item>
                    <Menu.Item
                        leftSection={<FaLaptopCode size={14} />}
                    >
                        팀 프로젝트
                    </Menu.Item>
                    <Menu.Item
                        leftSection={<FaRegStar size={14} />}
                    >
                        수강평
                    </Menu.Item>
                    <Menu.Item
                        leftSection={<FaRegLightbulb size={14} />}
                    >
                        멘토링 후기
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
}

export default NavBarLeft;