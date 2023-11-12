const _1MB = 1000000
export const LIMIT_SIZE = {
  image: 5 * _1MB,
  file: 100 * _1MB,
  video: 300 * _1MB
}

export const FILE_EXT_WHITE_LIST = ['.pdf']
export const IMAGE_EXT_WHITE_LIST = ['.jpg', '.jpeg', '.png']
export const VIDEO_EXT_WHITE_LIST = ['.mp4', '.avi']

export const WHITE_LIST_TYPES = '.pdf, .png, .jpeg, .jpg, .mp4, .avi'
export const REGEX_FILE_UPLOAD = /(\.jpg|\.jpeg|\.png|\.mp4|\.avi|\.pdf)$/i

export const INVALID_FILE_EXT_MESSAGE = 'The valid file extension is .png, .jpg, .mp4, .avi'
export const INVALID_FILE_SIZE = 'The size of the file is over 100MB'
export const INVALID_IMAGE_SIZE = 'The size of the image is over 5MB'
export const INVALID_VIDEO_SIZE = 'The size of the video is over 300MB'
