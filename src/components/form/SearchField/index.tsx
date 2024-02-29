import { ChangeEvent, FC, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Box, Button, InputAdornment, InputBase, styled } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

const InputSearch = styled(InputBase)(({ theme }) => ({
  borderColor: theme.palette.grey[800],
  borderWidth: '1px',
  borderStyle: 'solid',
  padding: '5px 10px 3px 16px',
  borderRadius: '30px 0 0 30px',
  '&.Mui-focused': {
    borderColor: theme.palette.info.dark
  }
}))

const SearchField: FC = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const navigate = useNavigate()

  const handleChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.currentTarget.value)

  const handleSearch = () => {
    if (searchQuery === '') return
    navigate('/results?search_query=' + searchQuery)
  }

  return (
    <Box
      data-testid='SearchField'
      display={'flex'}
      justifyContent={'end'}
      width={'42%'}
      mr={5}
    >
      <InputSearch
        sx={{ width: isFocus ? 'calc(80% + 32px)' : '80%' }}
        startAdornment={
          isFocus ? (
            <InputAdornment position='start'>
              <SearchIcon data-testid='searchIcon' />
            </InputAdornment>
          ) : undefined
        }
        inputProps={{
          role: 'search',
          placeholder: 'Search',
          onFocus: () => setIsFocus(true),
          onBlur: () => setIsFocus(false),
          onChange: handleChangeSearchQuery,
          onKeyDown: event => {
            if (event.key === 'Enter') handleSearch()
          }
        }}
      />

      <Button
        variant='outlined'
        color='inherit'
        role='button'
        sx={{
          borderRadius: '0 20px 20px 0',
          borderWidth: '1px 1px 1px 0'
        }}
        onClick={() => handleSearch()}
      >
        <SearchIcon />
      </Button>
    </Box>
  )
}

export default SearchField
