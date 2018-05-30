import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

export default class FileDownloadForm extends PureComponent {

  static propTypes = {
    method: PropTypes.string,
    downloadUrl: PropTypes.string.isRequired,
    onDownloadComplete: PropTypes.func.isRequired,
    queryParams: PropTypes.object,
    accessToken: PropTypes.string,
  }

  static defaultProps = {
    method: 'POST'
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).submit()
    this.props.onDownloadComplete()
  }

  getFormInputs() {
    const { queryParams } = this.props
    if (!queryParams) {
      return null
    }

    return queryParams.map((item, index) => (
      <input key={index} name={item.name} type="hidden" value={item.value} />
    ))
  }

  render() {
    const { downloadUrl, method } = this.props
    return (
      <form action={downloadUrl} className="hidden" method={method}>
        <input name="accessToken" type="hidden" value={this.props.accessToken} />
        {this.getFormInputs()}
      </form>
    )
  }
}
