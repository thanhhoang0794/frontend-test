import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const circular = definePartsStyle({
  control: defineStyle({
    rounded: 'full'
  }),
  icon: defineStyle({
    width: '10px',
    height: '8px'
  })
})

const baseStyle = definePartsStyle({
  control: {
    borderColor: 'gray.400',
    borderRadius: '6px',
    w: '20px',
    h: '20px'
  }
})

export const CustomCheckbox = defineMultiStyleConfig({ baseStyle, variants: { circular } })
