export type ServiceFnWithParams<TResponse = unknown, TParams = unknown> = (
  params: TParams
) => Promise<TResponse>

export type ServiceFnWithoutParams<TResponse = unknown> =
  () => Promise<TResponse>

export type ServiceFn<TResponse = unknown, TParams = unknown> =
  | ServiceFnWithParams<TResponse, TParams>
  | ServiceFnWithoutParams<TResponse>
