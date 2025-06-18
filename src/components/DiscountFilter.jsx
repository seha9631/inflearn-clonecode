import { Button } from '@mantine/core';

function DiscountFilter({ selected, onChange }) {
    return (
        <Button
            variant={selected ? 'filled' : 'outline'}
            color={selected ? '#00c471' : 'gray'}
            radius='md'
            onClick={() => onChange(!selected)}
        >
            할인
        </Button>
    );
}

export default DiscountFilter;