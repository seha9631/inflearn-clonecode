import { Container, Group } from '@mantine/core';
import DifficultyFilter from './DifficultyFilter';
import DiscountFilter from './DiscountFilter';
import { useState } from 'react';

function FilterBar({ onFilterChange }) {
    const [isDiscounted, setIsDiscounted] = useState(false);
    const [difficulty, setDifficulty] = useState([]);

    const handleDiscountChange = (discounted) => {
        setIsDiscounted(discounted);
        onFilterChange({ difficulty, discounted });
    };

    const handleDifficultyChange = (levels) => {
        setDifficulty(levels);
        onFilterChange({ difficulty: levels, discounted: isDiscounted });
    };

    return (
        <Container size='xl' my='md'>
            <Group spacing='sm'>
                <DiscountFilter selected={isDiscounted} onChange={handleDiscountChange} />
                <DifficultyFilter selected={difficulty} onChange={handleDifficultyChange} />
            </Group>
        </Container>
    );
}

export default FilterBar;