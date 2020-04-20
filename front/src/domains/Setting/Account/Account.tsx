import React from 'react'
import { SettingListBase } from '../SettingListBase'
import { Container } from '../../../materials/Container'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { SettingList } from '../SettingList'
import { H2 } from '../../../materials/Text'

export const Account = () => {
  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <SettingListBase />
        </ScreenLeft>
        <ScreenRight>
          <H2>アカウント設定</H2>
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}