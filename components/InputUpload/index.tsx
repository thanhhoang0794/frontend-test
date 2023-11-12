import { Box, FormErrorMessage, HStack, Text } from '@chakra-ui/react'
import { get } from 'lodash'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Icon from 'components/Icon'
import { WHITE_LIST_TYPES } from './const'
import { getFileType, inValidFile } from './utils'

export interface IFileError {
  error: string
}

export interface IUploadFileProps {
  onFileChange?: (file: File[] | never[]) => void
  id: string
  isMultiple?: boolean
  error?: string
  value: any
}

export const InputUpload = ({ onFileChange, id, isMultiple = true, error, value }: IUploadFileProps) => {
  const [listFileUpload, setListFileUpload] = useState<File[] | string[]>([])
  const hasChanged = useRef(false)

  const updateFileUpload = (files: File[]) => {
    hasChanged.current = true
    setListFileUpload(files)
  }

  useEffect(() => {
    if (hasChanged.current) {
      onFileChange?.(listFileUpload as File[])
      hasChanged.current = false
    }
  }, [listFileUpload, onFileChange])

  useEffect(() => {
    if (value && get(value, 'length')) {
      setListFileUpload(value)
    }
  }, [value])

  const firstErrorFileIndex = useMemo(() => {
    const errors = listFileUpload.map(file => inValidFile(file as any))

    const errorIndex = errors.findIndex(i => !!i)

    return errorIndex
  }, [listFileUpload])

  const handleFileInput = (e: React.FormEvent<HTMLInputElement>) => {
    const fileList = (e.target as HTMLInputElement).files

    if (!fileList) {
      return
    }

    const result = Object.values(fileList) as File[]
    const tempUploadFile = [...listFileUpload] as File[]
    updateFileUpload(tempUploadFile.concat(result))
  }

  const onRemoveFile = (indexItem: number) => {
    const tempUploadFile = [...listFileUpload] as File[]
    updateFileUpload(tempUploadFile.filter((_: File | string, index: number) => index !== indexItem))
  }

  const getIconName = (file: File) => {
    const fileType = getFileType(file)

    switch (fileType) {
      case 'file':
        return 'ic-file.svg'

      case 'image':
        return 'ic-image.svg'

      case 'video':
        return 'ic-video.svg'

      default:
        return 'ic-file.svg'
    }
  }

  return (
    <Box>
      <input
        style={{ display: 'none' }}
        type="file"
        onChange={handleFileInput}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          ;(event.target as HTMLInputElement).value = ''
        }}
        accept={WHITE_LIST_TYPES}
        id={id}
        multiple={isMultiple}
      />

      <label htmlFor={id} style={{ cursor: 'pointer' }}>
        <HStack pointerEvents="none">
          <Icon alt="Upload" iconName="ic-upload.svg" />
          <Text color="blue.600" fontSize="16px" fontWeight={500}>
            Upload images/videos
          </Text>
        </HStack>
      </label>

      {listFileUpload && (
        <Box>
          {listFileUpload.map((item, index) => {
            return (
              <HStack key={index} justifyContent="space-between" mt="18px">
                <HStack w="60%">
                  <Icon width={36} height={36} iconName={getIconName(item as File)} alt="file" />
                  <Text
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    color={firstErrorFileIndex === index ? 'red.600' : 'gray.900'}
                  >
                    {get(item, 'name', item)}
                  </Text>
                </HStack>

                <Text
                  color="blue.600"
                  fontSize="16px"
                  fontWeight="500"
                  onClick={() => onRemoveFile(index)}
                  cursor="pointer"
                >
                  Remove
                </Text>
              </HStack>
            )
          })}
        </Box>
      )}

      {error && <FormErrorMessage mt="16px">{error}</FormErrorMessage>}
    </Box>
  )
}
