import type { BaseResponse } from './BaseResponse';

interface UserSuccess {
    requests: {
        limit: number;
        used: number;
    }
}

export type UserResponse = BaseResponse<UserSuccess>;
