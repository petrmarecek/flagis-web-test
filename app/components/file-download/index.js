import React from 'react'
import PropTypes from 'prop-types'
import FileDownloadForm from './file-download-form'

const FileDownload = props => {
  const { downloadUrl, queryParams } = props
  return (
    <span>
      {downloadUrl &&
        <FileDownloadForm
          accessToken={props.auth.accessToken}
          downloadUrl={downloadUrl}
          queryParams={queryParams}
          onDownloadComplete={props.onDownloadComplete} />
      }
    </span>
  )
}

FileDownload.propTypes = {
  downloadUrl: PropTypes.string,
  queryParams: PropTypes.object,
  auth: PropTypes.object.isRequired,
  onDownloadComplete: PropTypes.func.isRequired,
}

export default FileDownload
