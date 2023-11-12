type DownloadBlobProps = {
  filename: string
  blob: Blob
}

export const downloadBlob = ({ filename, blob }: DownloadBlobProps) => {
  const { type, size } = blob

  if (size === 0) {
    throw Error('It cannot be downloaded. File size is 0.')
  }

  const data = new Blob([blob], { type })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(data)
  link.setAttribute('download', filename)
  link.click()
}
