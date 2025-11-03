import type { BaseResponse } from './BaseResponse';

interface DeleteSuccess {
  success: true;
}

export type DeleteResponse = BaseResponse<DeleteSuccess>;
