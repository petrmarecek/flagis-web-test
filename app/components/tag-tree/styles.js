import styled from 'styled-components'

const AddSection = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  background-color: #293034;
  bottom: 0;
  left: 0;
  flex-direction: row;
  cursor: pointer;
`;

const AddSectionText = styled.div`
  flex: 3;
  border-top: 1px solid #43FFB1;
  color: #fff;
  margin: 0 0 23px 28px;
  padding: 8px 0 0 3px;
  font-size: 14px;
`;

const AddSectionIcon = styled.div`
  flex: 1;
  margin: 0 28px 24px 0;
  padding: 8px 13px 0 0;
  border-top: 1px solid #43FFB1;
  text-align: right;
`;

export {
  AddSection,
  AddSectionText,
  AddSectionIcon,
}
