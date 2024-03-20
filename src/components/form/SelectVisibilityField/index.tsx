import type { FC } from 'react'

import type { UseFormRegister } from 'react-hook-form'

import { Visibility } from '@/models/types'

import MenuItem from '@/components/ui/MenuItem'

import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  type SelectProps
} from '@mui/material'

import PublicIcon from '@mui/icons-material/Public'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'

interface Props extends SelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  name: string
  defaultValue?: Visibility
  error?: boolean
  errorMessage?: string
  disableLabel?: boolean
}

const SelectVisibilityField: FC<Props> = ({
  register,
  name,
  error,
  errorMessage,
  defaultValue,
  disableLabel,
  ...selectProps
}) => {
  return (
    <FormControl variant='standard' error={error}>
      {!disableLabel && (
        <InputLabel id='privacy-label' error={error}>
          Privacy
        </InputLabel>
      )}

      <Select
        labelId='privacy-label'
        name={name}
        error={error}
        defaultValue={defaultValue}
        {...selectProps}
        {...(register && register(name))}
      >
        <MenuItem value={Visibility.PUBLIC} startIcon={<PublicIcon />}>
          Public
        </MenuItem>
        <MenuItem value={Visibility.ONLY_URL} startIcon={<LinkOutlinedIcon />}>
          Only URL
        </MenuItem>
        <MenuItem value={Visibility.PRIVATE} startIcon={<LockOutlinedIcon />}>
          Private
        </MenuItem>
      </Select>

      {error && <FormHelperText error={error}>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export default SelectVisibilityField
