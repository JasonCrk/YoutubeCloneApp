import { cleanup, screen, waitFor } from '@testing-library/react'

import { setupServer } from 'msw/node'

import NavbarAsidePlaylistLinkList from '@/features/playlist/components/NavbarAsidePlaylistLinkList'
import {
  retrieveOwnPlaylistsMockService,
  simplePlaylistsMockResponse
} from '@/features/playlist/mock/api'

import { render } from '@/utils/testing/render'

const server = setupServer(retrieveOwnPlaylistsMockService)

describe('<NavbarAsidePlaylistLinkList />', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    cleanup()
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('Should show the playlist list if playlists are loaded', async () => {
    render(<NavbarAsidePlaylistLinkList />)

    const playlistListElement = await waitFor(() =>
      screen.findByTestId('NavbarAsidePlaylistLinkList')
    )
    expect(playlistListElement).toBeInTheDocument()
  })

  it("Shouldn't show the playlist list if playlists are not loaded", async () => {
    render(<NavbarAsidePlaylistLinkList />)

    const playlistListElement = screen.queryByTestId(
      'NavbarAsidePlaylistLinkList'
    )
    expect(playlistListElement).toBeNull()
  })

  it('Should show the playlists if playlists are loaded', async () => {
    render(<NavbarAsidePlaylistLinkList />)

    const playlistElementItems = await waitFor(() =>
      screen.getAllByRole('link')
    )
    expect(playlistElementItems).toHaveLength(
      simplePlaylistsMockResponse.data.length
    )
  })

  it('Should contain the mock response', async () => {
    render(<NavbarAsidePlaylistLinkList />)

    const playlistElementItems = await waitFor(() =>
      screen.getAllByRole('link')
    )

    for (let i = 0; i < simplePlaylistsMockResponse.data.length; i++) {
      expect(playlistElementItems[i]).toHaveTextContent(
        simplePlaylistsMockResponse.data[i].name
      )
    }
  })
})
