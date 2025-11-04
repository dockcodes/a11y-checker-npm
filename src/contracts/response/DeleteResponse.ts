import type { BaseResponse } from './BaseResponse';

export interface DeleteSuccess {
  success: true;
}

export type DeleteResponse = BaseResponse<DeleteSuccess>;
