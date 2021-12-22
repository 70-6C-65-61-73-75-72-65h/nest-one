export const bcryptSalt = 5;
export enum NetworkErrors {
  ACCOUNT_EXISTS = 'Account with such email already exists',
  ROLE_EXISTS = 'Role with such value already exists',
  POST_EXISTS = 'Post with such title already exists',
  INVALID_EMAIL_OR_PASSWORD = 'Invalid email or password',
  INVALID_PASSWORD = 'Invalid password',
  UNAUTHORIZED_USER = 'User unauthorized',
  FORBIDDEN = 'Forbidden resource',
  USER_NOT_FOUND = 'User or role was not found'
}
export const bearerAuthStartPart = 'Bearer';
