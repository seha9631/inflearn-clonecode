import { TextInput } from '@mantine/core';
import { TbSearch } from 'react-icons/tb';

function SearchInout() {
    return <TextInput
        placeholder='나의 진짜 성장을 도와줄 실무 강의를 찾아보세요'
        radius='md'
        size='sm'
        rightSection={<TbSearch size={20} color='black' />}
        style={{ flexGrow: 1, maxWidth: 400 }}
    />
}

export default SearchInout;