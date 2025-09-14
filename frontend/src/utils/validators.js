export function validateName(name) {
  return typeof name === "string" && name.length >= 20 && name.length <= 60;
}

export function validateAddress(address) {
  return typeof address === "string" && address.length <= 400;
}

export function validatePassword(password) {
  if (typeof password !== "string") return false;
  if (password.length < 8 || password.length > 16) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  return true;
}

export function validateEmail(email) {
  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return re.test(email);
}
