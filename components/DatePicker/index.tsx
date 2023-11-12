import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Button, HStack, IconButton, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { MONTHS } from './constant'
import DatePickerInput from './DatePickerInput'
import { dpRangeToDate, dpRangeToString } from './utils'

export type DateNull = Date | null

export type DatePickerProps = {
  range?: boolean
  name?: string
  value?: string
  onChange?: (value?: Date | Array<DateNull>) => void

  startDate?: Date
  endDate?: Date

  defaultValue?: Date | Array<DateNull>

  disableFuture?: boolean
}

export const DatePicker = ({ range, name, onChange, value, defaultValue, disableFuture }: DatePickerProps) => {
  const [startDate, setStartDate] = useState<DateNull>(null)
  const [endDate, setEndDate] = useState<DateNull>(null)
  const calRef = useRef<any>()

  const changeStartEndDate = (dates: Array<DateNull>) => {
    const [start, end] = dates as Array<DateNull>

    const _start = !!start?.valueOf() ? start : null
    const _end = !!end?.valueOf() ? end : null

    setStartDate(_start)
    setEndDate(_end)
  }

  const handleChange =
    (isApply = false) =>
    (dates: [DateNull, DateNull] | Date) => {
      if (range && Array.isArray(dates)) {
        changeStartEndDate(dates)

        // Need click apply button to call onChange with range date picker
        if (range && !isApply) {
          return
        }
        onChange && onChange(dates)
      } else {
        onChange && onChange(dates)
      }
    }

  const formatValueForRange = (v: string) => {
    if (!range) {
      return v
    }

    const [start, end] = dpRangeToDate(v)
    if (!start || !end) {
      return ''
    }

    return dpRangeToString(start, end)
  }

  useEffect(() => {
    if (range && value) {
      const [start, end] = dpRangeToDate(value)
      if (start && end) {
        setStartDate(start)
        setEndDate(end)
      }
    }

    if (!value) {
      return
    }
    setStartDate(dayjs(value).toDate())
  }, [value])

  const onClose = () => {
    calRef.current.setOpen(false)
  }

  const onApply = () => {
    handleChange(true)([startDate, endDate])
    onClose()
  }

  useEffect(() => {
    if (!defaultValue) {
      return
    }

    if (Array.isArray(defaultValue)) {
      changeStartEndDate(defaultValue)
      return
    }

    setStartDate(defaultValue as Date)
  }, [defaultValue])

  return (
    <ReactDatePicker
      ref={calRef}
      name={name}
      onChange={handleChange()}
      selected={startDate}
      startDate={startDate}
      endDate={endDate}
      selectsRange={range}
      formatWeekDay={day => day.slice(0, 1)}
      customInput={<DatePickerInput formatValue={formatValueForRange} />}
      // When we have range datepicker, we will need click apply button to search
      shouldCloseOnSelect={!range}
      {...(disableFuture ? { maxDate: new Date() } : {})}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled
      }) => (
        <HStack justifyContent="space-between" pb="20px">
          <IconButton
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            variant="outline"
            aria-label="prev"
            icon={<ChevronLeftIcon color="gray.600" />}
          ></IconButton>

          <Text fontSize="18px" fontWeight="600" color="gray.900">
            {MONTHS[date?.getMonth()]}
          </Text>

          <IconButton
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            variant="outline"
            aria-label="next"
            icon={<ChevronRightIcon color="gray.600" />}
          ></IconButton>
        </HStack>
      )}
    >
      {range && (
        <HStack p={4} borderTop="1px solid" borderColor="gray.300" justifyContent="flex-end" w="100%">
          <Button variant={'outline'} onClick={onClose} mr={3}>
            Cancel
          </Button>

          <Button variant="ghost" backgroundColor="#FFCD1C" onClick={onApply}>
            Apply
          </Button>
        </HStack>
      )}
    </ReactDatePicker>
  )
}
