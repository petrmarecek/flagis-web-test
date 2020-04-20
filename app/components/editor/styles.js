import styled from 'styled-components'
import { colors } from '../styled-components-mixins/colors'

// --------------------------------------- Variables -------------------------------------------
const controlPanelPadding = 10
const controlButtonSize = 30
const separatorMargin = 10

// --------------------------------------- Editor -------------------------------------------
const EditorWrapper = styled.div`
  width: auto;
  height: auto;
  position: relative;
`

const ControlsPanel = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  background-color: ${colors.white};
  width: 100%;
  border: 1px solid ${colors.coldWind};
  padding: 0 ${controlPanelPadding}px;
`

const ControlButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.isSmall ? '12px' : '14px')};
  height: ${controlButtonSize}px;
  width: ${controlButtonSize}px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  font-weight: bold;
  color: ${(props) =>
    props.isActive ? colors.darkJungleGreen : colors.astrocopusGrey};

  :hover {
    color: ${(props) =>
      props.disabled ? colors.astrocopusGrey : colors.darkJungleGreen};
  }
`

const EditArea = styled.div`
  width: auto;
  height: auto;
  border: 1px solid ${colors.coldWind};
  padding: 45px 15px 15px 15px;
  height: ${(props) => props.editorHeight};
  font-size: 14px;
  cursor: text;

  h1 {
    margin: 6px 0 18px 0;
    font-size: 24px;
    font-weight: bold;
  }

  h2 {
    margin: 6px 0 12px 0;
    font-size: 18px;
    font-weight: bold;
  }

  .public-DraftEditorPlaceholder-inner {
    position: absolute;
    color: #e1e4e5;
  }

  .public-DraftStyleDefault-block {
    line-height: 18px;
  }

  .public-DraftStyleDefault-ul {
    list-style: disc;
    margin-left: 25px;
  }
`

const Separator = styled.div`
  width: 1px;
  height: 30px;
  background-color: ${colors.coldWind};
  margin: 0 ${separatorMargin}px;
`

export { EditorWrapper, ControlsPanel, ControlButton, EditArea, Separator }
