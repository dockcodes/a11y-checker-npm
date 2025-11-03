import type { BaseResponse } from './BaseResponse';

export interface LoginSuccess {
  access_token: string;
}

export type LoginResponse = BaseResponse<LoginSuccess>;
