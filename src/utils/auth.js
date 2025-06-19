
export function login(id, password) {
  const stored = localStorage.getItem(id);
  if (!stored) return { success: false, error: '존재하지 않는 사용자입니다.' };

  const userInfo = JSON.parse(stored);
  if (userInfo.password !== password) {
    return { success: false, error: '비밀번호가 일치하지 않습니다.' };
  }

  localStorage.setItem('loggedInUser', JSON.stringify({ id, ...userInfo }));
  return { success: true, user: { id, ...userInfo } };
}

export function logout() {
  localStorage.removeItem('loggedInUser');
}

export function getUser() {
  const data = localStorage.getItem('loggedInUser');
  return data ? JSON.parse(data) : null;
}