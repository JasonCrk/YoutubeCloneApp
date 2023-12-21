export type ServiceFn<TResponse = unknown, TParams = unknown> = (
  params?: TParams
) => Promise<TResponse>
