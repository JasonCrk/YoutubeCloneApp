import { FC, useState } from 'react'

import { UseFormRegister } from 'react-hook-form'

import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps
} from '@mui/material'

import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material'

interface Props extends Omit<OutlinedInputProps, 'name'> {
  id: string
  label?: string
  name: string
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
}

const PasswordField: FC<Props> = ({
  id,
  label,
  register,
  name,
  errorMessage,
  ...inputProps
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleToggleShowPassword = () => {
    setShowPassword(prevValue => !prevValue)
  }

  return (
    <FormControl variant='outlined' error={inputProps.error}>
      <InputLabel htmlFor={id} error={inputProps.error}>
        {label}
      </InputLabel>

      <OutlinedInput
        id={id}
        {...inputProps}
        {...(register !== undefined ? register(name) : undefined)}
        label={label}
        name={name}
        type={showPassword ? 'text' : 'password'}
        inputProps={{ role: 'textbox' }}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              edge='end'
              role='button'
              onClick={() => handleToggleShowPassword()}
            >
              {showPassword ? (
                <VisibilityOffIcon data-testid='visibilityOffIcon' />
              ) : (
                <VisibilityIcon data-testid='visibilityIcon' />
              )}
            </IconButton>
          </InputAdornment>
        }
      />

      {errorMessage && (
        <FormHelperText data-testid='errorMessage' error>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default PasswordField
