import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  FormErrorMessage,
  Button
} from '@chakra-ui/react'
import get from 'lodash/get'
import startCase from 'lodash/startCase'
import { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Icon from 'components/Icon'
export interface IFormItemProps {
  name: string
  label?: string
  type?: string
  placeholder?: string
  isRequired?: boolean
  children?: ReactNode
  helperText?: string
  readonly?: boolean
  disabled?: boolean
  hideLabel?: boolean
  className?: string
  errorClassName?: string
  min?: number
  width?: string
  height?: string
  inputColor?: string
  autoComplete?: string
  hideErrorMessage?: boolean
  maxLength?: number
  removeButtonLabel?: string
  onRemoveButtonClick?: () => void
  onChange?: (v: any) => void
  onFocusCapture?: () => void
}
const FormInput = (props: IFormItemProps) => {
  const {
    name,
    label,
    type = 'text',
    placeholder,
    isRequired = true,
    children,
    readonly,
    disabled,
    hideLabel,
    className,
    errorClassName,
    inputColor,
    min,
    width,
    height,
    autoComplete,
    hideErrorMessage,
    removeButtonLabel,
    onRemoveButtonClick,
    maxLength
  } = props
  const {
    register,
    formState: { errors },
    control
  } = useFormContext()
  let pattern: { value: RegExp; message: string } | undefined
  switch (name) {
    case 'dateOfBirth':
      //*INFO: validate (MM/DD/YYYY), with a year between 1900 and 2099
      pattern = {
        value: /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/,
        message: 'Please enter a valid date'
      }
      break
    default:
      pattern = undefined
  }

  const disabledProps = disabled
    ? {
        disabled: true,
        background: 'gray.300',
        opacity: '0.7 !important',
        color: 'gray.400',
        variant: 'filled',
        borderColor: 'gray.400'
      }
    : {}

  return (
    <FormControl
      isInvalid={!!get(errors, name, false)}
      alignSelf={!label || hideLabel ? 'flex-end' : undefined}
      className={className}
      width={width}
    >
      <HStack
        spacing="14px"
        maxHeight={6}
        marginBottom={label ? 2 : 0}
        position="relative"
        justifyContent="space-between"
        mb={4}
      >
        {label && !hideLabel && (
          <FormLabel color="gray.700" lineHeight={6} marginBottom={0} marginInlineEnd={0} minWidth="200px">
            {label}
          </FormLabel>
        )}
        {removeButtonLabel && (
          <Button variant={'outline'} onClick={onRemoveButtonClick}>
            {removeButtonLabel}
          </Button>
        )}
      </HStack>
      {children ? (
        children
      ) : type !== 'number' ? (
        // <Controller
        //   name={name}
        //   control={control}
        //   rules={{ required: isRequired ? `${label ?? startCase(name)} is required` : false }}
        //   render={({ field }) => (
        //     <Input
        //       height={height}
        //       type={type}
        //       autoComplete={autoComplete ?? name}
        //       placeholder={placeholder}
        //       isReadOnly={readonly}
        //       color={inputColor}
        //       maxLength={maxLength}
        //       {...disabledProps}
        //       {...field}
        //       onChange={v => {
        //         field.onChange(v)
        //         onChange?.(v)
        //       }}
        //       onFocusCapture={() => onFocusCapture?.()}

        //       // {...register(name, {
        //       //   required: isRequired ? `${label ?? startCase(name)} is required` : false
        //       // })}
        //     />
        //   )}
        // />
        <Input
          height={height}
          type={type}
          autoComplete={autoComplete ?? name}
          placeholder={placeholder}
          isReadOnly={readonly}
          color={inputColor}
          maxLength={maxLength}
          {...disabledProps}
          {...register(name, {
            required: isRequired ? `${label ?? startCase(name)} is required` : false
          })}
        />
      ) : (
        // <Input
        //   height={height}
        //   type={type}
        //   autoComplete={autoComplete ?? name}
        //   placeholder={placeholder}
        //   isReadOnly={readonly}
        //   color={inputColor}
        //   maxLength={maxLength}
        //   {...disabledProps}
        //   {...register(name, {
        //     required: isRequired ? `${label ?? startCase(name)} is required` : false
        //   })}
        // />
        <Controller
          name={name}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <NumberInput focusBorderColor="teal.500" {...field} min={min}>
              <NumberInputField maxLength={maxLength} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
        />
      )}
      {!hideErrorMessage && (
        <HStack mt={1}>
          <Icon iconName="ic-error-form.svg" alt="" size={15} visible={!!get(errors, `${name}.message`, '')} />
          <FormErrorMessage className={errorClassName}>{get(errors, `${name}.message`, '')}</FormErrorMessage>
        </HStack>
      )}
    </FormControl>
  )
}

export default FormInput
