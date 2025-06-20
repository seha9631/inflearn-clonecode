export function verifyUser(id, password) {
  const stored = localStorage.getItem(id);
  if (!stored) return { success: false, error: '존재하지 않는 사용자입니다.' };

  const userData = JSON.parse(stored);
  if (userData.password !== password) {
    return { success: false, error: '비밀번호가 일치하지 않습니다.' };
  }

  return { success: true, user: { id, ...userData } };
}