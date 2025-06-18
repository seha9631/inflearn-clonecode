import { TextInput } from '@mantine/core';
import { TbSearch } from 'react-icons/tb';
import { ActionIcon } from '@mantine/core';

function SearchInput({ query, setQuery, onSearch }) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <TextInput
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            placeholder='나의 진짜 성장을 도와줄 실무 강의를 찾아보세요'
            radius='md'
            size='sm'
            rightSection={
                <ActionIcon onClick={onSearch} variant='transparent'>
                    <TbSearch size={20} color='black' />
                </ActionIcon>
            }
            style={{ flexGrow: 1, maxWidth: 400 }}
        />
    );
}

export default SearchInput;