import { Tabs, Container } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { categories } from '../util/constants';

function CategoryTabs() {
    const navigate = useNavigate();
    const { category } = useParams();

    const handleTabChange = (value) => {
        navigate(`/courses/${value}`);
    };

    return (
        <Container size='xl'>
            <Tabs value={category || 'all'} onChange={handleTabChange} color='#00c471'>
                <Tabs.List grow>
                    {categories.map((cat) => (
                        <Tabs.Tab key={cat.value} value={cat.value} fz='xs'>
                            {cat.label}
                        </Tabs.Tab>
                    ))}
                </Tabs.List>
            </Tabs>
        </Container>
    );
}

export default CategoryTabs;