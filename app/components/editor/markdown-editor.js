import React, { useRef, useEffect, useCallback } from 'react'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types';
import { Editor } from '@toast-ui/react-editor'

const toolsByView = {
  full: ['heading', 'bold', 'italic', 'strike', 'divider', 'hr', 'quote', 'divider', 'ul',
   'ol', 'task', 'divider', 'table', 'link', 'image', 'divider', 'code', 'codeblock'],
  simple: ['heading', 'bold', 'italic', 'strike', 'divider', 'hr', 'quote', 'divider', 'ul',
   'ol', 'task', 'divider', 'link', 'divider', 'code', 'codeblock'],
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
}) => {

  const editorRef = useRef()

  useEffect(() => {
    const editor = editorRef.current.getInstance()
    editor.setMarkdown(content || '', false)
  }, [componentId])

  const saveDescription = useCallback(() => {
    const editor = editorRef.current.getInstance()
    const markdown = editor.getMarkdown()
    setDescription(markdown)
  }, [editorRef])

  const debouncedSaveDescription = debounce(saveDescription, 1000)

  return (
    <div>
      <Editor
        ref={editorRef}
        initialValue={content}
        previewStyle="horizontal"
        height={editorHeight}
        initialEditType="wysiwyg"
        useCommandShortcut
        usageStatistics={false}
        hideModeSwitch={false}
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
          }
        }}
        toolbarItems={toolsByView[view]}
      />
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
}
