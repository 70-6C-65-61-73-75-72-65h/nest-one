export const bcryptSalt = 5;
export enum NetworkErrors {
  ACCOUNT_EXISTS = 'Account with such email already exists',
  INVALID_EMAIL_OR_PASSWORD = 'Invalid email or password',
  INVALID_PASSWORD = 'Invalid password',
  UNAUTHORIZED_USER = 'User unauthorized',
}
export const bearerAuthStartPart = 'Bearer';
