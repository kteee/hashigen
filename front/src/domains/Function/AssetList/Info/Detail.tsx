import React from 'react'
import { Card } from '../../../../materials/Div'
import { FlexWrapper } from '../../../../materials/Flex'
import { SButton } from '../../../../materials/Button'
import { H2 } from '../../../../materials/Text'
import { SDl, SDt, SDd, SDWrapper } from '../../../../materials/Definition'
import { AssetDetailDetailResponse } from '../../../../utilities/types'
import { digitComma } from '../../../../utilities/digitComma'

interface DetailProps {
  detail: AssetDetailDetailResponse
}

export const Detail = (props: DetailProps) => {

  return (
    <Card overflow='auto'>
      <FlexWrapper justifyContent='space-between'>
        <H2>資産詳細</H2>
        <SButton>編集</SButton>
      </FlexWrapper>
      <hr/>
      <SDl>
        <SDWrapper>
          <SDt>資産ID</SDt>
          <SDd>{props.detail.id}</SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>名称</SDt>
          <SDd>{props.detail.name}</SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>取得日</SDt>
          <SDd>{props.detail.acquisition_date}</SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>償却開始日</SDt>
          <SDd>{props.detail.depreciation_start_date}</SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>取得価格</SDt>
          <SDd>{digitComma(props.detail.acquisition_value)}</SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>登録時簿価</SDt>
          <SDd>{digitComma(props.detail.year_start_book_value)}</SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>所在地（都道府県）</SDt>
          <SDd>{props.detail.prefecture}</SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>所在地（市区町村）</SDt>
          <SDd>{props.detail.city}</SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>登録日</SDt>
          <SDd>{props.detail.created_at}</SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>最終更新日</SDt>
          <SDd>{props.detail.updated_at}</SDd>
        </SDWrapper>
      </SDl>
    </Card>
  )
}