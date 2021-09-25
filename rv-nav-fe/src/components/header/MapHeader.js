import React from 'react'
import styled from 'styled-components';

const Header = styled.div`
  height: 80px;
  width: auto
  background: #2A2E43;
`
const Text = styled.span`
  position: absolute;
  left: 0.74%;
  // right: 90.31%;
  top: 1.25%;
  bottom: 12.5%;
  color: rgba(53, 195, 226, 0.95);
  font-size: 36px;
  font-weight: bold;
  font-family: Heebo;
`

const MapHeader = () => {

  return (
    <>
      <Header className="rv-way-header">
        <Text className="rv-way-header-text">RV WAY</Text>
      </Header>
    </>

  )
}

export default MapHeader