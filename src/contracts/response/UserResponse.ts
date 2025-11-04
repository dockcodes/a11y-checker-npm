import type { BaseResponse } from './BaseResponse';

export interface UserSuccess {
    requests: {
        limit: number;
        used: number;
    }
}

export type UserResponse = BaseResponse<UserSuccess>;
