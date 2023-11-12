import { extendTheme } from '@chakra-ui/react'
import { Dict } from '@chakra-ui/utils'
import { CustomCheckbox } from './checkbox.theme'
import { colors } from './colors.theme'
import {
  breakPoints,
  focusBorderColorPrimary} from './globalStyles'
import { CustomInput } from './input.theme'
import { CustomRadio } from './radio.theme'
import { CustomSelect } from './Select.theme'
import { CustomTextArea } from './textArea.theme'

export function getTheme(): Dict {
  const theme = extendTheme({
    breakpoints: breakPoints,
    components: {
      CloseButton: {
        sizes: {
          xl: {
            width: 12,
            height: 12
          }
        }
      },
      Input: CustomInput,
      Select: CustomSelect,
      Textarea: CustomTextArea,
      Radio: CustomRadio,
      Checkbox: CustomCheckbox,
      // INFO: Fix modal content not full height on iOS safari
      // More detail:https://github.com/chakra-ui/chakra-ui/issues/4680
      Modal: {
        baseStyle: {
          dialogContainer: {
            '@supports(height: -webkit-fill-available)': {},
            height: '100%'
          }
        }
      }
    },
    shadows: {
      outline: `0 0 0 3px ${focusBorderColorPrimary}`
    },
    styles: {
      global: {
        'html, body': {
          background: 'white'
        }
      }
    },
    colors,
    fonts: {
      heading: 'Poppins',
      body: 'Poppins',
      mono: 'Poppins'
    }
  })

  return theme
}
