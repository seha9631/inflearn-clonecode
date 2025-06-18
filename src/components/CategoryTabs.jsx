import { Tabs, Container } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';

const categories = [
    { label: '전체', value: 'all' },
    { label: '개발 · 프로그래밍', value: 'it-programming' },
    { label: '게임 개발', value: 'game-dev-all' },
    { label: '데이터 사이언스', value: 'data-science' },
    { label: '인공지능', value: 'artificial-intelligence' },
    { label: '보안 · 네트워크', value: 'it' },
    { label: '하드웨어', value: 'hardware' },
    { label: '디자인 · 아트', value: 'design' },
    { label: '기획 · 경영 · 마케팅', value: 'business' },
    { label: '업무 생산성', value: 'productivity' },
    { label: '커리어 · 자기계발', value: 'career' },
    { label: '대학 교육', value: 'academics' },
];

function CategoryTabs() {
    const navigate = useNavigate();
    const { category } = useParams();

    const handleTabChange = (value) => {
        navigate(`/courses/${value}`);
    };

    return (
        <Container size="xl">
            <Tabs defaultValue={category || 'all'} onChange={handleTabChange} color="#00c471">
                <Tabs.List grow>
                    {categories.map((cat) => (
                        <Tabs.Tab key={cat.value} value={cat.value} fz="xs">
                            {cat.label}
                        </Tabs.Tab>
                    ))}
                </Tabs.List>
            </Tabs>
        </Container>
    );
}

export default CategoryTabs;