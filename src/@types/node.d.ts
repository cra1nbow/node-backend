type AsyncReturnType<T> = T extends (...args: any) => PromiseLike<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : T;

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
  }
}
