export interface IUser {
  id: number;
  email: string;
  username: string;
  is_superuser: boolean;
}

export type TUser = Pick<IUser, 'id' | 'username' | 'email'>;

export type TCreateUser = Pick<IUser, 'email' | 'username'> & {
  password: string;
};

export type TUpdateUser = Partial<Pick<IUser, 'email' | 'username'>>

// ---------------------------------------------------------------------------

export interface IPost {
  id: number;
  user: TUser;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
}

export type TCreatePost = Pick<IPost, 'title' | 'content' | 'is_published'>

export type TUpdatePost = Partial<TCreatePost>

// ---------------------------------------------------------------------------

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access: string;
  refresh: string;
  message: string;
  user: IUser;
}

export interface ILogoutResponse {
  message: string;
}

export type TRefreshTokenResponse = Pick<ILoginResponse, 'access' | 'refresh'>;