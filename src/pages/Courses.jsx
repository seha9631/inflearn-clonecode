import { useParams } from 'react-router-dom';
import { Text, Container } from '@mantine/core';

const Courses = () => {
    const { category } = useParams();

    return (
        <Container size="xl">
            <Text>
                선택된 카테고리: {category}
            </Text>
        </Container>
    );
}

export default Courses;