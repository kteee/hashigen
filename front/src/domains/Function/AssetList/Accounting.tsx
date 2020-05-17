import React from 'react'
import { Card } from '../../../materials/Div'
import { H2 } from '../../../materials/Text'
import { SDl, SDt, SDd, SDWrapper } from '../../../materials/Definition'
import { digitComma } from '../../../utilities/digitComma'
import { AssetDetailAccountingResponse } from '../../../utilities/types'


interface AccountingProps {
  accounting: AssetDetailAccountingResponse
}

export const Accounting = (props: AccountingProps) => {
  return (
    <Card overflow='auto'>
      <H2>会計情報</H2>
      <hr/>
      <SDl>
        <SDWrapper>
          <SDt>資産グループ</SDt>
          <SDd>{props.accounting.asset_group.name}</SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>資産細目</SDt>
          <SDd>{props.accounting.asset_item.item}</SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>償却方法</SDt>
          <SDd>{props.accounting.dep_method.display_name}</SDd>
        </SDWrapper>
      </SDl>
    </Card>
  )
}