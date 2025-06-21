import { Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';

function DownloadButton({ title, materialPath }) {
    return (
        <Button
            component='a'
            href={materialPath}
            download
            leftSection={<IconDownload size={16} />}
            color='gray'
            variant='light'
        >
            {title}
        </Button>
    );
}

export default DownloadButton;