import React from 'react'
import { SettingListBase } from './SettingListBase'
import { Container } from '../../materials/Container'
import { ScreenWrapper, ScreenLeft } from '../../materials/ScreenDivider'

export const SettingList = () => {
  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <SettingListBase />
        </ScreenLeft>
      </ScreenWrapper>
    </Container>
  )
}