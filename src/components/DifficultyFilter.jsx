import { Menu, Button, Checkbox, Stack } from '@mantine/core';
import { LEVELS } from '../utils/constants';

function DifficultyFilter({ selected, onChange }) {
    const isSelected = selected.length > 0;

    const toggleLevel = (level) => {
        if (selected.includes(level)) {
            onChange(selected.filter((l) => l !== level));
        } else {
            onChange([...selected, level]);
        }
    };

    return (
        <Menu shadow='md' width={200}>
            <Menu.Target>
                <Button
                    variant={isSelected ? 'filled' : 'outline'}
                    radius='md'
                    color={isSelected ? '#00c471' : 'gray'}
                >
                    난이도
                </Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Stack spacing='xs'>
                    {LEVELS.map((level) => (
                        <Checkbox
                            color='#00c471'
                            key={level}
                            label={level}
                            checked={selected.includes(level)}
                            onChange={() => toggleLevel(level)}
                        />
                    ))}
                </Stack>
            </Menu.Dropdown>
        </Menu>
    );
}

export default DifficultyFilter;