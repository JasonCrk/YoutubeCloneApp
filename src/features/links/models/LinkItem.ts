import type {
  LinkId,
  LinkPosition,
  LinkTitle,
  LinkUrl
} from '@/features/links/types'

export interface LinkItem {
  id: LinkId
  title: LinkTitle
  url: LinkUrl
  position: LinkPosition
}
