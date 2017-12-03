import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FileDownloadForm from './file-download-form';

export default class FileDownload extends Component {

  static propTypes = {
    downloadUrl: PropTypes.string,
    queryParams: PropTypes.object,
    auth: PropTypes.object.isRequired,
    onDownloadComplete: PropTypes.func.isRequired,
  }

  render() {
    const { downloadUrl, queryParams } = this.props
    return (
      <span>
        {downloadUrl &&
          <FileDownloadForm
            accessToken={this.props.auth.accessToken}
            downloadUrl={downloadUrl}
            queryParams={queryParams}
            onDownloadComplete={this.props.onDownloadComplete} />
        }
      </span>
    )
  }
}
