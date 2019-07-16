import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from 'draft-js'
import debounce from 'lodash/debounce'
import { markdownToDraft, draftToMarkdown } from 'markdown-draft-js'

// components
import Bold from './editor-controls/inline-controls/bold'
import Italic from './editor-controls/inline-controls/italic'
import Underline from './editor-controls/inline-controls/underline'
import Highlight from './editor-controls/inline-controls/highlight'
import HeaderOne from './editor-controls/block-controls/header-one'
import HeaderSecond from './editor-controls/block-controls/header-second'
import UnorderedList from './editor-controls/block-controls/unordered-list'
import { Scrollbars } from 'react-custom-scrollbars'

// styles
import { EditorWrapper, ControlsPanel, EditArea, Separator } from './styles'
import { colors } from '../styled-components-mixins/colors'

const allowedKeyCommand = ['undo', 'redo', 'bold', 'italic', 'underline']
const styleMap = {
  highlight: {
    backgroundColor: colors.hanumanGreen,
  },
}

export default class TextEditor extends Component {
  static propTypes = {
    componentId: PropTypes.string,
    editorHeight: PropTypes.string,
    scrollStyle: PropTypes.object,
    content: PropTypes.string,
    setDescription: PropTypes.func,
  }

  constructor(props) {
    super(props)

    // init draftjs editor
    this.initialEditorState = EditorState.createEmpty()

    // load contet to editor and create editorState
    const newEditorState = this.loadDescription(this.props.content)
    this.state = { editorState: newEditorState }

    // debounce call for change of editor
    this.debouncedSaveEditor = debounce(this.saveDescription, 1000)
  }

  saveDescription() {
    const draftDescription = this.state.editorState.getCurrentContent()
    const rawContentState = convertToRaw(draftDescription)
    const markDownDescription = draftToMarkdown(rawContentState)

    this.props.setDescription(markDownDescription)
  }

  loadDescription(content) {
    if (content !== '') {
      const draftDescription = markdownToDraft(content)
      const newContentState = convertFromRaw(draftDescription)
      const initialEditorState = EditorState.createWithContent(newContentState)
      return initialEditorState
    } else {
      return this.initialEditorState
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.componentId !== newProps.componentId) {
      const newEditorState = this.loadDescription(newProps.content)
      this.setState({ editorState: newEditorState })
    }
  }

  onFocus = () => this.refs.editor.focus()

  onChange = editorState => {
    this.setState({ editorState })
    this.debouncedSaveEditor()
  }

  handleKeyCommand = command => {
    const { editorState } = this.state
    if (!allowedKeyCommand.includes(command)) {
      return false
    }
    console.log(command)

    const newEditorState = RichUtils.handleKeyCommand(editorState, command)
    if (newEditorState) {
      this.onChange(newEditorState)
      return true
    }

    return false
  }

  toggleBlockType = blockType => {
    const { editorState } = this.state
    const newEditorState = RichUtils.toggleBlockType(editorState, blockType)

    this.onChange(newEditorState)
  }

  toggleInlineStyle = inlineStyle => {
    const { editorState } = this.state
    const newEditorState = RichUtils.toggleInlineStyle(editorState, inlineStyle)

    this.onChange(newEditorState)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { editorState } = this.state
    const { editorHeight, scrollStyle } = this.props

    return (
      editorState !== nextState.editorState ||
      editorHeight !== nextProps.editorHeight ||
      scrollStyle !== nextProps.scrollStyle
    )
  }

  render() {
    const { editorState } = this.state
    const { editorHeight, scrollStyle } = this.props
    console.log(editorHeight)

    return (
      <EditorWrapper>
        <ControlsPanel>
          <Bold editorState={editorState} onToggle={this.toggleInlineStyle} />
          <Italic editorState={editorState} onToggle={this.toggleInlineStyle} />
          <Underline
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <Highlight
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <Separator />
          <HeaderOne
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <HeaderSecond
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <UnorderedList
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <Separator />
        </ControlsPanel>
        <EditArea onClick={this.onFocus} editorHeight={editorHeight}>
          <Scrollbars style={{ ...scrollStyle }}>
            <Editor
              ref="editor"
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              placeholder="Add description"
            />
          </Scrollbars>
        </EditArea>
      </EditorWrapper>
    )
  }
}
