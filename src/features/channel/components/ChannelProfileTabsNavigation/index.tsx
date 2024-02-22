import { useState, type FC, SyntheticEvent, useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import type { ChannelHandle, ChannelId } from '@/features/channel/types'

import { Tab } from '@/components/ui/Tab'
import { Tabs } from '@/components/ui/Tabs'

interface Props {
  channelHandle: ChannelHandle
  channelId: ChannelId
}

const ChannelProfileTabsNavigation: FC<Props> = ({
  channelHandle,
  channelId
}) => {
  const [tabSelected, setTabSelected] = useState<number>(0)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleSelectTab = (_: SyntheticEvent, tabIndex: number) => {
    setTabSelected(tabIndex)
  }

  const basePathname = '/' + channelHandle

  useEffect(() => {
    const tabPathname: string = pathname.split('/').reverse()[0]

    if (Number(tabPathname) === channelId) {
      setTabSelected(0)
      return
    }

    setTabSelected(tabPathname === 'playlists' ? 1 : 0)
  }, [])

  return (
    <Tabs value={tabSelected} onChange={handleSelectTab}>
      <Tab
        disableTouchRipple
        label='Home'
        onClick={() => navigate(basePathname)}
      />
      <Tab
        disableTouchRipple
        label='Playlists'
        onClick={() => navigate(basePathname + '/playlists')}
      />
    </Tabs>
  )
}

export default ChannelProfileTabsNavigation
