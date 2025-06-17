import {
    Box,
    Text,
    Anchor,
    Container
} from '@mantine/core';
import classes from './FooterBottom.module.css';

const FooterBottom = () => {
    return <Container size='xl'
        pt={30}
        pb={20}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
        <Box>
            <Text fz={12} mb={12}>
                <Anchor href='https://www.inflearn.com' target='_blank' mr={8}>
                    <img
                        src='https://cdn.inflearn.com/assets/brand/brand_logo.png'
                        alt='Inflearn Logo'
                        style={{ height: 16 }}
                    />
                </Anchor>
                &nbsp;|&nbsp; 개인정보처리방침 &nbsp;|&nbsp; 이용약관 &nbsp;|&nbsp;
                <Anchor href='#' c='#ced4da' fz={12} fw={700}>We Are Hiring</Anchor>
            </Text>
            <Text fz={13} style={{ lineHeight: 1.6 }} mb={12}>
                (주)인프랩 | 대표자: 이형주 | 사업자번호: 499-81-00612
                <Anchor href='http://www.ftc.go.kr/bizCommPop.do?wrkr_no=4998100612' target='_blank' c='#ced4da' fz={13}>
                    사업자 정보 확인
                </Anchor>
                <br />
                통신판매업: 2018-성남분당B-0062 | 개인정보보호책임자: 이동욱 | 이메일:
                <Anchor href='mailto:info@inflearn.com' c='#ced4da' fz={13}>
                    info@inflearn.com
                </Anchor>
                <br />
                전화번호: 070-4948-1181 | 주소:경기도 성남시 분당구 판교로289번길 20 3동 5층
            </Text>
            <Text fz={13} style={{ lineHeight: 1.6 }} mb={12}>
                ©INFLAB. ALL RIGHTS RESERVED
            </Text>
        </Box>

        <Box
            component='ul'
            style={{
                display: 'flex',
                gap: '16px',
                listStyle: 'none',
                padding: 0,
                margin: 0,
            }}
        >
            <li>
                <a
                    href='https://blog.naver.com/inflearn'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='인프런 네이버 블로그 바로가기'
                    style={{
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: '#ced4da',
                    }}
                >
                    <span style={{ fontSize: 25, fontWeight: 600, color: '#2c2e33' }}>B</span>
                </a>
            </li>

            <li>
                <a
                    href='https://www.instagram.com/inflearn__official'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='인프런 인스타그램 바로가기'
                    className={classes['FooterLink']}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 448 512'
                        aria-hidden='true'
                        className={classes['Icon']}
                    >
                        <path fill='#2f363d' d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z'></path>
                    </svg>
                </a>
            </li>

            <li>
                <a
                    href='https://www.youtube.com/channel/UC0Y0T9JpgIBbyGDjvy9PbOg'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='인프런 유튜브 바로가기'
                    className={classes['FooterLink']}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 576 512'
                        aria-hidden='true'
                        className={classes['Icon']}
                    >
                        <path d='M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z' />
                    </svg>
                </a>
            </li>

            <li>
                <a
                    href='https://www.facebook.com/inflearn'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='인프런 페이스북 바로가기'
                    className={classes['FooterLink']}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 320 512'
                        aria-hidden='true'
                        className={classes['Icon']}
                    >
                        <path d='M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z' />
                    </svg>
                </a>
            </li>

            <li>
                <a
                    href='https://twitter.com/inflearn'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='인프런 트위터 바로가기'
                    className={classes['FooterLink']}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 512 512'
                        aria-hidden='true'
                        className={classes['Icon']}
                    >
                        <path d='M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z' />
                    </svg>
                </a>
            </li>

            <li>
                <a
                    href='https://www.threads.net/@inflearn__official'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='인프런 스레드 바로가기'
                    className={classes['FooterLink']}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 448 512'
                        aria-hidden='true'
                        className={classes['Icon']}
                    >
                        <path fill='#2f363d' d='M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8c29.2 14.1 50.6 35.2 61.8 61.4c15.7 36.5 17.2 95.8-30.3 143.2c-36.2 36.2-80.3 52.5-142.6 53h-.3c-70.2-.5-124.1-24.1-160.4-70.2c-32.3-41-48.9-98.1-49.5-169.6V256v-.2C17 184.3 33.6 127.2 65.9 86.2C102.2 40.1 156.2 16.5 226.4 16h.3c70.3 .5 124.9 24 162.3 69.9c18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4c-29.2-35.8-73-54.2-130.5-54.6c-57 .5-100.1 18.8-128.2 54.4C72.1 146.1 58.5 194.3 58 256c.5 61.7 14.1 109.9 40.3 143.3c28 35.6 71.2 53.9 128.2 54.4c51.4-.4 85.4-12.6 113.7-40.9c32.3-32.2 31.7-71.8 21.4-95.9c-6.1-14.2-17.1-26-31.9-34.9c-3.7 26.9-11.8 48.3-24.7 64.8c-17.1 21.8-41.4 33.6-72.7 35.3c-23.6 1.3-46.3-4.4-63.9-16c-20.8-13.8-33-34.8-34.3-59.3c-2.5-48.3 35.7-83 95.2-86.4c21.1-1.2 40.9-.3 59.2 2.8c-2.4-14.8-7.3-26.6-14.6-35.2c-10-11.7-25.6-17.7-46.2-17.8H227c-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1h.8c62.6 .4 99.9 39.5 103.7 107.7l-.2 .2zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3c25.6-1.4 54.6-11.4 59.5-73.2c-13.2-2.9-27.8-4.4-43.4-4.4c-4.8 0-9.6 .1-14.4 .4c-42.9 2.4-57.2 23.2-56.2 41.8l-.1 .1z'></path>
                    </svg>
                </a>
            </li>
        </Box>
    </Container>
}

export default FooterBottom;