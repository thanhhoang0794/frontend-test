import { Box } from '@chakra-ui/react'
import { chakra, Flex as CkFlex, Text as CkText } from '@chakra-ui/react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import React, { forwardRef, ForwardRefRenderFunction } from 'react'
dayjs.extend(advancedFormat)
import Icon from 'components/Icon'

interface IDateFilterDatePickerProps {
  value?: string
  onClick?: () => void
  formatValue?: (v: string) => string
}

const DatePickerWrapper = chakra(CkFlex, {
  baseStyle: () => ({
    border: 'solid 1px',
    borderColor: 'background.gray.400',
    whiteSpace: 'nowrap',
    paddingLeft: { base: 4, lg: 4 },
    paddingRight: { base: 3, lg: 3 },
    paddingY: '7px',
    borderRadius: '6px',
    justifyContent: 'space-between',
    height: { base: '40px', lg: '40px' },
    alignItems: 'center'
  })
})

const DatePickerText = chakra(CkText, {
  baseStyle: () => ({
    color: 'text.grey.800',
    fontSize: { base: 'lg', lg: 'md' }
  })
})

const DateFilterDatePicker: ForwardRefRenderFunction<HTMLInputElement, IDateFilterDatePickerProps> = (props, ref) => {
  const { value, onClick, formatValue } = props
  return (
    <DatePickerWrapper onClick={onClick} ref={ref}>
      <DatePickerText
        color={!value ? '#A9A9A9' : '#222222'}
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        {value ? (formatValue ? formatValue(value) : value) : 'Date'}
      </DatePickerText>
      <Box width={5} height={5} alignSelf="center">
        <Icon iconName="ic-date.svg" width={20} height={20} onClick={onClick} alt="" />
      </Box>
    </DatePickerWrapper>
  )
}

const forwardedRefComponent = forwardRef(DateFilterDatePicker)
export default forwardedRefComponent
