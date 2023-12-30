import { ListResponse } from '@/models/responses'

export const listResponseAdapter = <
  TResponse = unknown,
  TAdapterResponse = unknown
>(
  list: ListResponse<TResponse>,
  adapterFn: (response: TResponse) => TAdapterResponse
): Array<TAdapterResponse> => {
  return list.data.map(data => adapterFn(data))
}
