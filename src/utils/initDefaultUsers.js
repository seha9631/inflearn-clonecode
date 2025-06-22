export function initializeDefaultUsers() {
  const alreadyInitialized = localStorage.getItem('defaultUsersInitialized');
  if (alreadyInitialized) return;

  const user1Id = 'seha9631@naver.com';
  const user1Info = {
    password: 'tkddms9631',
    phoneNumber: '01011119631',
    name: '하상은',
    cart: ['김호-리더십-메시지-메이커', '기획자와-pm을-위한-artificial-intelligence-강의', '기초-대수학-중고등'],
    wishlist: ['프롬프트-엔지니어링-챗지피티'],
    enrolled: ['한입-크기-타입스크립트', 'typescript-react-perfect-course'],
    coupon: ['INFCON2024 전용 쿠폰'],
    point: 12000,
  };

  const user2Id = 'jhlim@naver.com';
  const user2Info = {
    password: 'itnd0937',
    phoneNumber: '01011112222',
    name: '임준현',
    cart: ['랭그래프-활용한-llm에이전트-개발', '기초-대수학-중고등'],
    wishlist: [],
    enrolled: ['space-invader-python', 'AWS-서버리스-웹앱'],
    coupon: [],
    point: 100000,
  };

  localStorage.setItem(user1Id, JSON.stringify(user1Info));
  localStorage.setItem(user2Id, JSON.stringify(user2Info));

  localStorage.setItem('defaultUsersInitialized', 'true');
}