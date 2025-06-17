import { Button } from '@mantine/core';
import { PiGlobe } from 'react-icons/pi';

function LanguageButton() {
    return <Button
        variant='subtle'
        radius='md'
        size='md'
        fz={14}
        color='#495057'
        leftSection={<PiGlobe size={16} color='#495057' />}
    >
        한국어
    </Button>
}

export default LanguageButton;