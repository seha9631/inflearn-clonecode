import { Group, Menu, Text, Anchor } from '@mantine/core';
import { FaChevronRight } from 'react-icons/fa6';
import { TbCalendarStats } from 'react-icons/tb';
import { CATEGORIES } from '../../utils/constants';
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
                    <Link to='/courses/all' style={{ textDecoration: 'none' }}>
                        <Text
                            fz='md'
                            fw={700}
                            underline='never'
                            className={classes['HoverGreen']}
                        >
                            강의
                        </Text>
                    </Link>


                </Menu.Target>
                <Menu.Dropdown className={classes['SharpBorder']}>
                    {CATEGORIES.filter((cat) => cat.value !== 'all')
                        .map((cat) => (
                            <Menu.Item key={cat.value}>
                                <Link to={`/courses/${cat.value}`} style={{ textDecoration: 'none' }}>
                                    <Text
                                        c="black"
                                        fz="sm"
                                        fw={400}
                                        underline="never"
                                    >
                                        {cat.label}
                                    </Text>
                                </Link>
                            </Menu.Item>
                        ))}
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
                fz='md'
                fw={700}
                underline='never'
                className={classes['HoverGreen']}
            >
                로드맵
            </Anchor>
            <Anchor
                href='https://mentoring.inflearn.com/mentors'
                fz='md'
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
                            fz='md'
                            fw={700}
                            underline='never'
                            className={classes['HoverGreen']}
                        >
                            커뮤니티
                        </Text>
                    </Link>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item>
                        질문 & 답변
                    </Menu.Item>
                    <Menu.Item>
                        고민있어요
                    </Menu.Item>
                    <Menu.Item>
                        스터디
                    </Menu.Item>
                    <Menu.Item>
                        팀 프로젝트
                    </Menu.Item>
                    <Menu.Item>
                        수강평
                    </Menu.Item>
                    <Menu.Item>
                        멘토링 후기
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
}

export default NavBarLeft;