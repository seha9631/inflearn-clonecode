import supabase from '../lib/supabaseClient';

export async function logIn(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.message === 'Email not confirmed') {
      return '가입 이메일 인증이 필요합니다.';
    }
    if (error.message === 'Invalid login credentials') {
      return '아이디 또는 비밀번호를 확인해주세요.';
    }
    return '로그인 중 알 수 없는 오류가 발생했습니다.';
  }

  return null;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  return error ? error.message : null;
}