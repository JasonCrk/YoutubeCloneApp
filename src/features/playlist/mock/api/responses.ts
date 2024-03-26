import { ListResponse } from '@/models/responses'

import { SimplePlaylistList } from '@/features/playlist/models'

export const simplePlaylistsMockResponse: ListResponse<SimplePlaylistList> = {
  data: [
    {
      id: 1,
      name: 'test name playlist 1'
    },
    {
      id: 2,
      name: 'test name playlist 2'
    },
    {
      id: 3,
      name: 'test name playlist 3'
    }
  ]
}
