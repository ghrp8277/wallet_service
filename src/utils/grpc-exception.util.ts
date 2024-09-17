import { RpcException } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';

export enum GrpcStatus {
  OK = 0,
  CANCELLED = 1,
  UNKNOWN = 2,
  INVALID_ARGUMENT = 3,
  DEADLINE_EXCEEDED = 4,
  NOT_FOUND = 5,
  ALREADY_EXISTS = 6,
  PERMISSION_DENIED = 7,
  RESOURCE_EXHAUSTED = 8,
  FAILED_PRECONDITION = 9,
  ABORTED = 10,
  OUT_OF_RANGE = 11,
  UNIMPLEMENTED = 12,
  INTERNAL = 13,
  UNAVAILABLE = 14,
  DATA_LOSS = 15,
  UNAUTHENTICATED = 16,
}

export class GrpcException extends RpcException {
  constructor(message: string, status: GrpcStatus, statusCode: string) {
    const metadata = new Metadata();
    metadata.add('statusCode', statusCode);

    super({
      message,
      code: status,
      metadata,
    });
  }
}
