/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "../google/protobuf/empty.pb";

export const protobufPackage = "sample";

export interface SampleMessage {
  message: string;
}

export const SAMPLE_PACKAGE_NAME = "sample";

export interface SampleServiceClient {
  getHello(request: Empty, metadata?: Metadata): Observable<SampleMessage>;
}

export interface SampleServiceController {
  getHello(request: Empty, metadata?: Metadata): Promise<SampleMessage> | Observable<SampleMessage> | SampleMessage;
}

export function SampleServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getHello"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("SampleService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("SampleService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const SAMPLE_SERVICE_NAME = "SampleService";
