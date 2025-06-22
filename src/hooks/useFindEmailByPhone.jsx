export function useFindEmailByPhone() {
  const findEmailByPhone = (phone) => {
    for (let key in localStorage) {
      try {
        const user = JSON.parse(localStorage.getItem(key));
        if (user?.phoneNumber === phone) return key;
      } catch { }
    }
    return '';
  };

  const maskEmail = (email) => {
    const [user, domain] = email.split('@');
    return `${user.slice(0, 2)}***${user.slice(-2)}@${domain}`;
  };

  return { findEmailByPhone, maskEmail };
}

export default useFindEmailByPhone;