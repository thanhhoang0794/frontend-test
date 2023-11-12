import React from 'react'
import IconWithText from 'components/IconWithText'
import { ButtonWithIconWrapper } from './buttonWithIcon.styles'

export interface IButtonWithIconProps {
  iconName: string
  label?: string
  onClick?: () => void
  innerRef?: React.LegacyRef<HTMLDivElement>
  fontSize?: number | string
  bgc?: string
  size?: number
  width?: number
  height?: number
  zIndex?: number
  color?: string
  border?: string
}
const ButtonWithIcon = (props: IButtonWithIconProps) => {
  const { iconName, label, onClick, innerRef, width, height, size, zIndex, color, border, fontSize, bgc } = props
  return (
    <ButtonWithIconWrapper border={border} ref={innerRef} onClick={onClick} zIndex={zIndex} bgc={bgc}>
      <IconWithText
        color={color}
        iconName={iconName}
        label={label}
        size={size}
        fontSize={fontSize}
        width={width}
        height={height}
        spacing={0}
      />
    </ButtonWithIconWrapper>
  )
}
export default ButtonWithIcon
