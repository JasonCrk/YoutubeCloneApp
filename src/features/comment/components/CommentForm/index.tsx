import { useState, type FC, FocusEvent } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAppSelector } from '@/store/hooks'

import type { CommentInputs } from '@/features/comment/models'
import { createCommentValidator } from '@/features/comment/validators'

import { useAuthModalContext } from '@/features/auth/hooks'

import Picture from '@/components/ui/Picture'
import Button from '@/components/ui/Button'

import { CommentContentInput } from '@/features/comment/components/CommentForm/ui'

import { Box, Stack, useTheme } from '@mui/material'

interface Props {
  isLoading: boolean
  buttonText: string
  onSubmit: (data: CommentInputs) => void
  onCloseForm?: () => void
  autoFocus?: boolean
  disablePicture?: boolean
  defaultCommentData?: CommentInputs
}

const CommentForm: FC<Props> = ({
  onSubmit,
  onCloseForm,
  buttonText,
  isLoading,
  autoFocus,
  disablePicture,
  defaultCommentData
}) => {
  const { isAuth, user } = useAppSelector(state => state.auth)
  const { onOpen: onOpenAuthModal } = useAuthModalContext()

  const [showButtons, setShowButtons] = useState(false)

  const theme = useTheme()

  const {
    register,
    handleSubmit,
    reset: clearCreateCommentForm,
    formState: { isValid }
  } = useForm<CommentInputs>({
    resolver: zodResolver(createCommentValidator),
    defaultValues: defaultCommentData
  })

  const handleCancel = () => {
    setShowButtons(false)
    clearCreateCommentForm({
      content: ''
    })

    onCloseForm && onCloseForm()
  }

  const handleFocusInput = (event: FocusEvent<HTMLTextAreaElement>) => {
    if (!isAuth) {
      onOpenAuthModal()
      event.currentTarget.blur()
      handleCancel()
      return
    }

    setShowButtons(true)
  }

  const handleFormSubmit = handleSubmit(data => {
    if (!isAuth) {
      onOpenAuthModal()
      return
    }

    onSubmit(data)
  })

  return (
    <Box display='flex' gap={1.8} width='100%'>
      {!disablePicture && (
        <Picture
          name={user?.currentChannel.name ?? 'unauthenticated user'}
          src={user?.currentChannel.pictureUrl ?? null}
          defaultPicture={!isAuth}
        />
      )}

      <Box
        component='form'
        flexGrow={1}
        display='flex'
        alignItems='end'
        flexDirection='column'
        onSubmit={handleFormSubmit}
        gap={1}
      >
        <CommentContentInput
          fullWidth
          placeholder='Add a comment...'
          onFocus={handleFocusInput}
          multiline
          autoFocus={autoFocus}
          {...register('content')}
        />

        {showButtons && (
          <Stack direction='row' spacing={1}>
            <Button type='button' onClick={handleCancel}>
              Cancel
            </Button>

            <Button
              color='black'
              variant='solid'
              bgcolor={theme.palette.primary.dark}
              type='submit'
              disabled={!isValid || isLoading}
            >
              {buttonText}
              {isLoading && '...'}
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  )
}

export default CommentForm
