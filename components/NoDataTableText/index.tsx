import { Text } from '@chakra-ui/react'
import React from 'react'

interface INoDataTableText {
  message?: string
}
const NoDataTableText = (props: INoDataTableText) => {
  const { message } = props
  return (
    <Text w="full" align="center" fontSize="md" fontWeight={600} lineHeight={6} color="gray.400" fontStyle="italic">
      {message || 'No orders are matching the criteria'}
    </Text>
  )
}

export default NoDataTableText
