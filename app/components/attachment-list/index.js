import React from 'react'
import PropTypes from 'prop-types'

// redux
import { connect } from 'react-redux'
import { getLoader } from 'redux/store/app-state/app-state.selectors'

// components
import AttachmentAddButton from 'components/attachment-list/attachment-add-button'
import AttachmentListItem from 'components/attachment-list/attachment-list-item'
import ShadowScrollbar from 'components/common/shadow-scrollbar'
import Loader from 'components/common/loader'

// styles
import { LoaderWrapper, AttachmentsWrapper, ListWrapper } from './styles'

const AttachmentList = ({
  loader,
  attachments,
  disabled,
  attachmentScrollHeight,
  attachmentDelete,
  onFileUploaded,
}) => {
  if (loader) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    )
  }

  const scrollStyle = {
    height: `calc(100vh - ${attachmentScrollHeight}px)`,
    shadowHeight: 20,
    boxShadowTop: 'inset 0 10px 10px -5px #fff',
    boxShadowBottom: 'inset 0 -10px 10px -5px #fff',
    overflow: 'hidden',
  }

  return (
    <AttachmentsWrapper>
      <ShadowScrollbar style={scrollStyle} isScrollBottom>
        <ListWrapper>
          <ul>
            {!attachments.isFetching &&
              attachments.items.map(attachment => (
                <AttachmentListItem
                  key={attachment.id}
                  attachment={attachment}
                  attachmentDelete={attachmentDelete}
                  disabled={disabled}
                />
              ))}
          </ul>
        </ListWrapper>
      </ShadowScrollbar>
      <AttachmentAddButton onFileUploaded={onFileUploaded} />
    </AttachmentsWrapper>
  )
}

AttachmentList.propTypes = {
  loader: PropTypes.bool,
  attachments: PropTypes.object,
  disabled: PropTypes.bool,
  attachmentScrollHeight: PropTypes.number,
  onFileUploaded: PropTypes.number,
  attachmentDelete: PropTypes.func,
}

const mapStateToProps = state => ({
  loader: getLoader(state).attachments,
})

export default connect(mapStateToProps)(AttachmentList)
