import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'
import filepicker from 'filepicker-js'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

filepicker.setKey('A7hMFRb7XS6KIA4fg4DChz')

import styled from 'styled-components'

const AddAttachment = styled.div`
  margin-top: 10px;
`;

const PinIcon = styled(Icon)`
  vertical-align: middle;
  padding-right: 8px;
`;

const Button = styled.button`
  font-size: 14px;
  color: #8C9DA9;
  border: none;
  background-color: #fff;
  line-height: 26px;
  padding: 0;

  :active {
    outline: none;
  }

  :hover {
    color: #293034;
  }
`;

const FilePicker = ({ handleClick }) => (
  <AddAttachment>
    <PinIcon
      icon={ICONS.PIN}
      width={23}
      height={26}
      color={["#8C9DA9"]}
      onClick={handleClick}/>
    <Button onClick={handleClick}>Add attachment</Button>
  </AddAttachment>
)

FilePicker.propTypes = {
  test: PropTypes.string,
  onFileUploaded: PropTypes.func,
  handleClick: PropTypes.func,
}

export default withHandlers({
  handleClick: props => () => {
    filepicker.pick({language: 'en'}, (blob) => {
      props.onFileUploaded(blob)
    })
  }
})(FilePicker)
