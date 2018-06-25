import styled from 'styled-components'

// Detail
const DetailStyle = styled.div`
  ::-webkit-scrollbar {
        width: 5px;
  }

  ::-webkit-scrollbar-track {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
  }

  ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: darkgrey;
  }
`;

const DetailInner = styled.div`
  background-color: #fff;
  position: absolute;u
  top: 42px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const DetailContentTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  
  flex-grow: 100;
  min-height: 48px;
  justify-content: flex-start;
  position: relative;
  background-color: #fff;
  z-index: 1;
  padding: 0 12px;
  margin-bottom: 21px;
  
  &:before {
    content: "";
    position: absolute;
    z-index:-1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f6f8f9;
    .transform(scaleX(0));
    .transform-origin(0 50%);
  }
  
  &:after {
    content: "";
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 0;
    border-bottom: 2px solid #44FFB1;
  }
`;

const DetailContentSubject = styled.div`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  flex: 12;
  min-width: 30%;
  padding: 11px 10px 11px 0;
`;

const DetailSubject = styled.div`
  position: relative;
  z-index: 30;
`;

const DetailContentCenter = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  flex-shrink: 100;
  height: 100%;
  margin-bottom: 22px;
`;

// Detail menu
const Menu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 42px;
`;

const LeftMenu = styled.div`
  flex: 1;
  margin-left: 8px;
`;

const RightMenu = styled.div`
  flex: 1;
  text-align: right;
  margin-right: 5px;
  
  svg {
    margin-left: 20px;
  }
`;

// Contact detail
const DetailContentPropertiesContact = styled.div`
  flex: 3;
  margin: 0 25px 0 13px;
  display: flex;
  flex-direction: column;
  justify-content: space-start;
`;

const DetailContentDescriptionContact = styled.div`
  flex: 3;
  margin-right: 22px;

  textarea {
    &::-webkit-input-placeholder {
      color: #8c9da9;
    }
    &:-moz-placeholder { /!* Firefox 18- *!/
      color: #8c9da9;
    }
    
    &::-moz-placeholder { /!* Firefox 19+ *!/
      color: #8c9da9;
    }
    
    &:-ms-input-placeholder {
      color: #8c9da9;
    }
    
    font-family: 'Source Sans Pro', 'Segoe UI', sans-serif;
    font-weight: 300;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #293034;
    width: 100%;
    padding: 15px;
    border: 1px solid #D7E3EC;
    font-size: 14px;
    resize: vertical;
    min-height: 190px;
    max-height: 100%;
    height: auto;
  }
`;

const DetailContentContactData = styled.div`
  position: relative;
  color: #8c9da9;
  font-size: 14px;
  padding: 0 0 2px 0;
  margin: 10px 0;
  border-bottom: 1px solid #D7E3EC;
  cursor: default;
`;

const DetailContentContactDataLabel = styled.span`
  margin: 0 0 0 3px;
`;

const DetailContentContactDataContent = styled.div`
  margin: 0 5px 2px 0;
  float: right;
  font-size: 18px;
  color: #293034;
`;

export {
  // Detail
  DetailStyle,
  DetailInner,
  DetailContentTop,
  DetailContentCenter,
  DetailContentSubject,
  DetailSubject,

  // Detail menu
  Menu,
  LeftMenu,
  RightMenu,

  // Contact detail
  DetailContentPropertiesContact,
  DetailContentDescriptionContact,
  DetailContentContactData,
  DetailContentContactDataLabel,
  DetailContentContactDataContent,
}
