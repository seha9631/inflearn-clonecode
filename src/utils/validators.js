export const validateEmail = (value) => {
  const isValid = /\S+@\S+\.\S+/.test(value);
  return {
    isValid,
    message: isValid ? '' : '✗ 이메일 형식이 올바르지 않습니다.',
  };
};

export const validatePhone = (value) => {
  const isValid = /^010\d{7,8}$/.test(value);
  return {
    isValid,
    message: isValid ? '' : '✗ 전화번호 형식이 올바르지 않습니다.',
  };
};

export const isPhoneDuplicate = (value) => {
  for (let key in localStorage) {
    try {
      const user = JSON.parse(localStorage.getItem(key));
      if (user?.phoneNumber === value) return true;
    } catch (e) {
      continue;
    }
  }
  return false;
};

export const validatePassword = (value) => {
  const messages = [];

  if (
    !/(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])|(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(value)
  ) {
    messages.push('영문/숫자/특수문자 중 2가지 이상 포함');
  }

  if (value.length < 8 || value.length > 32) {
    messages.push('8자 이상 32자 이하 입력 (공백 제외)');
  }

  if (/(.)\1\1/.test(value)) {
    messages.push('연속 3자 이상 동일한 문자/숫자 제외');
  }

  return {
    isValid: messages.length === 0,
    messages,
  };
};

export const validateConfirmPassword = (password, confirmPassword) => {
  const isValid = password === confirmPassword;
  return {
    isValid,
    message: isValid ? '' : '✗ 비밀번호가 일치하지 않습니다.',
  };
};