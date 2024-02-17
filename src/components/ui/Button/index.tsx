import type { FC, ReactNode } from 'react'

import { ButtonWrapper, ButtonWrapperProps } from '@/components/ui/Button/ui'

interface Props extends ButtonWrapperProps {
  startIcon?: ReactNode
  endIcon?: ReactNode
}

const Button: FC<Props> = ({ children, startIcon, endIcon, ...props }) => {
  return (
    <ButtonWrapper {...props}>
      {startIcon}
      <span>{children}</span>
      {endIcon}
    </ButtonWrapper>
  )
}

export default Button
