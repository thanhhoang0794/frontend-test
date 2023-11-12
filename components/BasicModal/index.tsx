import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Modal
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface IBasicModalProps {
  titleText?: string
  bodyText?: string | ReactNode
  cancelButtonText?: string
  confirmButtonText?: string
  isOpen: boolean
  onClose: () => void
  bodyContent?: ReactNode
  footerContent?: ReactNode
}

const BasicModal = (props: IBasicModalProps) => {
  const {
    titleText = 'Confirm Changes',
    bodyText = 'Are you sure you want to do this?',
    cancelButtonText = '',
    confirmButtonText = '',
    isOpen,
    onClose,
    bodyContent,
    footerContent
  } = props

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="lg" lineHeight={7} color="gray.800" fontWeight={700}>
          {titleText}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{bodyContent ? bodyContent : <Text>{bodyText}</Text>}</ModalBody>
        <ModalFooter>
          {footerContent ? (
            footerContent
          ) : (
            <>
              {cancelButtonText && <Button
                color="gray.700"
                lineHeight={6}
                border="1px solid #E2E8F0"
                borderRadius="6px"
                background="gray.200"
                _hover={{ background: 'gray.300' }}
                _active={{ background: 'gray.400' }}
                marginRight={4}
                paddingY={2}
                onClick={onClose}
              >
                {cancelButtonText}
              </Button>}
             {confirmButtonText && <Button
                borderRadius="6px"
                lineHeight={6}
                colorScheme="teal"
                paddingY={2}
                backgroundColor="red.600"
                onClick={onClose}
                _hover={{ background: 'red.700' }}
                _active={{ background: 'red.800' }}
              >
                {confirmButtonText}
              </Button>}
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BasicModal
