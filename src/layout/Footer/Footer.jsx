import {
    Box,
    Divider
} from '@mantine/core';
import FooterTop from './FooterTop';
import FooterBottom from './FooterBottom';

function Footer() {
    return (
        <Box bg='#2f363d' c='#ced4da' pt={40}>
            <FooterTop />
            <Divider my={0} color='#495057' />
            <FooterBottom />
        </Box>
    );
}

export default Footer;