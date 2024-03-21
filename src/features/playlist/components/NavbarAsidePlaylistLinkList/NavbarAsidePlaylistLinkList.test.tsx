import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

    const playlistListElement = await screen.findByTestId(
      'NavbarAsidePlaylistLinkList'
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

  it('Should show a "Show more" button if playlists are loaded', async () => {
    render(<NavbarAsidePlaylistLinkList />)

    const showMorePlaylistsButton = await screen.findByText('Show more')

    expect(showMorePlaylistsButton).toBeInTheDocument()
  })

  it('Should show the playlists if playlists are loaded and user click the "Show more" button', async () => {
    render(<NavbarAsidePlaylistLinkList />)

    const user = userEvent.setup()

    const showMorePlaylistsButton = await screen.findByText('Show more')

    await user.click(showMorePlaylistsButton)

    const playlistElementItems = await screen.findAllByRole('link')

    expect(playlistElementItems).toHaveLength(
      simplePlaylistsMockResponse.data.length
    )
  })
})
