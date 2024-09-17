import { ErrorCode } from './error-code';

export const ErrorMessage = {
  [ErrorCode.WALLET_NOT_FOUND]: '지갑을 찾을 수 없습니다.',
  [ErrorCode.WALLET_ALREADY_EXISTS]: '해당 사용자에게 이미 지갑이 존재합니다.',
  [ErrorCode.INVALID_AMOUNT]: '잘못된 금액입니다.',
  [ErrorCode.INSUFFICIENT_BALANCE]: '잔액이 부족합니다.',
  [ErrorCode.UNAUTHORIZED_ACCESS]: '인증되지 않은 접근입니다.',
};
