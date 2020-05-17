import React from 'react'
import { Card } from '../../../materials/Div'
import { H2 } from '../../../materials/Text'
import { SDl, SDt, SDd, SDWrapper } from '../../../materials/Definition'
import { digitComma } from '../../../utilities/digitComma'
import { AssetDetailTransactionResponse } from '../../../utilities/types'


interface TransactionslProps {
  transactions: AssetDetailTransactionResponse[]
}

export const Transactions = (props: TransactionslProps) => {

  const TransactionList = props.transactions.map(txn => {
    return (
      <SDl>
        <SDWrapper>
          <SDt>日付</SDt>
          <SDd>{txn.date}</SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>取引種類</SDt>
          <SDd>{txn.transaction_type}</SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>取引金額</SDt>
          <SDd>{digitComma(txn.amount)}</SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>ステータス</SDt>
          <SDd>{txn.status}</SDd>
        </SDWrapper>
      </SDl>
    )
  })


  return (
    <Card overflow='auto'>
      <H2>処理履歴</H2>
      <hr/>
      {TransactionList}
    </Card>
  )
}