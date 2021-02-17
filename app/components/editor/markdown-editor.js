import React, { useRef, useEffect, useCallback } from 'react'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import { Editor, Viewer } from '@toast-ui/react-editor'

// styles
import styled from 'styled-components'

// styles for disabled mode
const ViewerWrapper = styled.div`
  border: 1px solid #e5e5e5;
  height: ${props => props.height};
  max-height: ${props => props.height};
  padding: 16px 25px;
  overflow-y: auto;
  overflow-x: hidden;

  // set viewer max-height for scrolling
  .tui-editor-contents {
    max-height: ${props => `calc(${props.height} - 32px)`};
  }

  // disable list
  .task-list-item {
    pointer-events: none;
  }
`

const toolsByView = {
  full: [
    'heading',
    'bold',
    'italic',
    'strike',
    'divider',
    'hr',
    'quote',
    'divider',
    'ul',
    'ol',
    'task',
    'divider',
    'table',
    'link',
    'image',
    'divider',
    'code',
    'codeblock',
  ],
  simple: [
    'heading',
    'bold',
    'italic',
    'strike',
    'divider',
    'hr',
    'quote',
    'divider',
    'ul',
    'ol',
    'task',
    'divider',
    'link',
    'divider',
    'code',
    'codeblock',
  ],
}

/**
 * See https://nhn.github.io/tui.editor/latest/ToastUIEditor
 */
export const MarkdownEditor = ({
  componentId,
  content,
  setDescription,
  editorHeight,
  onInsertImage,
  view,
  disabled,
}) => {
  const editorRef = useRef()

  const handlePasteBefore = useCallback(event => {
    event.clipboardContainer.querySelectorAll('span').forEach(el => {
      el.outerHTML = el.textContent
    })
  }, [])

  useEffect(() => {
    const editor = editorRef.current.getInstance()
    editor.setMarkdown(content || '', false)
    editor.on('pasteBefore', handlePasteBefore)
  }, [componentId, handlePasteBefore])

  const saveDescription = useCallback(() => {
    const editor = editorRef.current.getInstance()
    const markdown = editor.getMarkdown()
    setDescription(markdown)
  }, [editorRef])

  const debouncedSaveDescription = debounce(saveDescription, 1000)

  return (
    <div>
      {disabled && (
        <ViewerWrapper height={editorHeight}>
          <Viewer ref={editorRef} initialValue={content} />
        </ViewerWrapper>
      )}
      {!disabled && (
        <Editor
          ref={editorRef}
          initialValue={content}
          previewStyle="horizontal"
          height={editorHeight}
          initialEditType="wysiwyg"
          useCommandShortcut
          usageStatistics={false}
          hideModeSwitch={false}
          placeholder="Add description..."
          events={{
            change: debouncedSaveDescription,
          }}
          hooks={{
            addImageBlobHook: (file, callback) => {
              if (onInsertImage) {
                onInsertImage([file], callback)
                return true
              }

              return false
            },
          }}
          toolbarItems={toolsByView[view]}
        />
      )}
    </div>
  )
}

MarkdownEditor.defaultProps = {
  content: '',
}

MarkdownEditor.propTypes = {
  componentId: PropTypes.string,
  content: PropTypes.string,
  editorHeight: PropTypes.string,
  setDescription: PropTypes.func,
  onInsertImage: PropTypes.func,
  view: PropTypes.oneOf(['full', 'simple']),
  disabled: PropTypes.bool,
}
