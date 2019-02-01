import styled from 'styled-components'

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #fff;
`

const DashboardGraph = styled.div`
  margin: 0 0 50px 0;
`

const DashboardLabel = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 20px 0;
  text-align: center;
`

export { DashboardWrapper, DashboardGraph, DashboardLabel }
