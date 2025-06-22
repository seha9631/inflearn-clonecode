import { TextInput } from '@mantine/core';
import { TbSearch } from 'react-icons/tb';
import { ActionIcon } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function SearchInput({ query, setQuery }) {
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/search?s=${encodeURIComponent(query.trim())}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
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
                <ActionIcon onClick={handleSearch} variant='transparent'>
                    <TbSearch size={20} color='black' />
                </ActionIcon>
            }
            style={{ flexGrow: 1, maxWidth: 400 }}
        />
    );
}

export default SearchInput;