import { Model } from '#interfaces';

export interface User extends Model {
  user: {
    name: string | null;
    email: string;
    username: string;
    email_verified_at: string | null;
  };

  token: string;
}

export interface LoginData {
  identifier: string;
  password: string;
}

export interface SignupData {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}
