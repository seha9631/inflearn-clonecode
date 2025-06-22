import {
  IconListDetails,
  IconMessageQuestion,
  IconNotes,
  IconWorld,
} from '@tabler/icons-react';

export const CATEGORIES = [
  { label: '전체', value: 'all' },
  { label: '개발 · 프로그래밍', value: 'it-programming' },
  { label: '게임 개발', value: 'game-dev-all' },
  { label: '데이터 사이언스', value: 'data-science' },
  { label: '인공지능', value: 'artificial-intelligence' },
  { label: '보안 · 네트워크', value: 'it' },
  { label: '하드웨어', value: 'hardware' },
  { label: '디자인 · 아트', value: 'design' },
  { label: '기획 · 경영 · 마케팅', value: 'business' },
  { label: '업무 생산성', value: 'productivity' },
  { label: '커리어 · 자기계발', value: 'career' },
  { label: '대학 교육', value: 'academics' },
];

export const COUNTRY_CODES = [
  { value: '+82', label: '대한민국 +82' },
  { value: '+1', label: '미국/캐나다 +1' },
  { value: '+81', label: '일본 +81' },
  { value: '+86', label: '중국 +86' },
  { value: '+44', label: '영국 +44' },
  { value: '+49', label: '독일 +49' },
  { value: '+33', label: '프랑스 +33' },
  { value: '+61', label: '호주 +61' },
  { value: '+64', label: '뉴질랜드 +64' },
  { value: '+91', label: '인도 +91' },
  { value: '+60', label: '말레이시아 +60' },
  { value: '+62', label: '인도네시아 +62' },
  { value: '+66', label: '태국 +66' },
  { value: '+65', label: '싱가포르 +65' },
  { value: '+886', label: '대만 +886' }
];

export const LEVELS = ['입문', '초급', '중급이상'];

export const SIDEBAR_ITEMS = [
  { icon: IconListDetails, label: '커리큘럼', key: 'curriculum' },
  { icon: IconMessageQuestion, label: '질문&답변', key: 'qa' },
  { icon: IconNotes, label: '노트', key: 'notes' },
  { icon: IconWorld, label: '글로벌', key: 'global' },
];

export const WISHLIST_NOTIFICATION_MESSAGES = {
  added: {
    color: 'green',
    title: '찜한 강의로 추가되었습니다.',
  },
  removed: {
    color: 'red',
    title: '찜 목록에서 제거되었습니다.',
  },
  unauth: {
    color: 'red',
    title: '로그인이 필요합니다.',
  },
};

export const CART_NOTIFICATION_MESSAGES = {
  added: {
    color: 'green',
    title: '장바구니에 담겼습니다.',
  },
  removed: {
    color: 'red',
    title: '장바구니에서 제거되었습니다.',
  },
  unauth: {
    color: 'red',
    title: '로그인이 필요합니다.',
  },
};


export const COURSE_SIDEBAR_NOTIFICATION = {
  success: {
    color: 'green',
    title: '장바구니에 담겼습니다.',
    iconType: 'success',
  },
  duplicate: {
    color: 'yellow',
    title: '이미 장바구니에 담긴 강의입니다.',
    iconType: 'duplicate',
  },
  unauth: {
    color: 'red',
    title: '로그인이 필요합니다.',
    iconType: 'unauth',
  },
};

export const ITEMS_PER_PAGE = 40;

export const INFLEARN_LOGO = 'https://cdn.inflearn.com/assets/brand/logo.png';