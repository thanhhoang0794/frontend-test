import { get } from 'lodash'
import {
  FILE_EXT_WHITE_LIST,
  IMAGE_EXT_WHITE_LIST,
  INVALID_FILE_EXT_MESSAGE,
  INVALID_FILE_SIZE,
  INVALID_IMAGE_SIZE,
  INVALID_VIDEO_SIZE,
  LIMIT_SIZE,
  REGEX_FILE_UPLOAD,
  VIDEO_EXT_WHITE_LIST
} from './const'

const getExt = (file: File | string) => get(file, 'name', file).substring(get(file, 'name', file).lastIndexOf('.'))
export const getFileType = (file: File) => {
  const ext = getExt(file)

  if (FILE_EXT_WHITE_LIST.includes(ext)) {
    return 'file'
  }

  if (IMAGE_EXT_WHITE_LIST.includes(ext)) {
    return 'image'
  }

  if (VIDEO_EXT_WHITE_LIST.includes(ext)) {
    return 'video'
  }

  return undefined
}

const inValidExt = (file: File) => !REGEX_FILE_UPLOAD.test(getExt(file))

const inValidSize = (file: File) => {
  const fileType = getFileType(file)
  if (!fileType) {
    return true
  }

  return file.size > LIMIT_SIZE[fileType]
}

export const inValidFile = (file: File) => {
  if (inValidExt(file)) {
    return INVALID_FILE_EXT_MESSAGE
  }

  if (inValidSize(file)) {
    const fileType = getFileType(file)

    switch (fileType) {
      case 'file':
        return INVALID_FILE_SIZE
      case 'image':
        return INVALID_IMAGE_SIZE
      case 'video':
        return INVALID_VIDEO_SIZE
      default:
        return INVALID_FILE_SIZE
    }
  }

  return false
}
