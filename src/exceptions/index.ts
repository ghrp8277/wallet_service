import { GrpcException, GrpcStatus } from '@/utils/grpc-exception.util';
import { ErrorMessage } from './error-message';
import { ErrorCode } from './error-code';

export class WalletNotFoundException extends GrpcException {
    constructor() {
        super(ErrorMessage[ErrorCode.WALLET_NOT_FOUND], GrpcStatus.NOT_FOUND, ErrorCode.WALLET_NOT_FOUND);
    }
}

export class WalletAlreadyExistsException extends GrpcException {
    constructor() {
        super(
            ErrorMessage[ErrorCode.WALLET_ALREADY_EXISTS],
            GrpcStatus.ALREADY_EXISTS,
            ErrorCode.WALLET_ALREADY_EXISTS,
        );
    }
}

export class InvalidAmountException extends GrpcException {
    constructor() {
        super(ErrorMessage[ErrorCode.INVALID_AMOUNT], GrpcStatus.INVALID_ARGUMENT, ErrorCode.INVALID_AMOUNT);
    }
}

export class InsufficientBalanceException extends GrpcException {
    constructor() {
        super(
            ErrorMessage[ErrorCode.INSUFFICIENT_BALANCE],
            GrpcStatus.FAILED_PRECONDITION,
            ErrorCode.INSUFFICIENT_BALANCE,
        );
    }
}

export class UnauthorizedAccessException extends GrpcException {
    constructor() {
        super(ErrorMessage[ErrorCode.UNAUTHORIZED_ACCESS], GrpcStatus.UNAUTHENTICATED, ErrorCode.UNAUTHORIZED_ACCESS);
    }
}
