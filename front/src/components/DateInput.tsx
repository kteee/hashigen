import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
import { DateInputProps } from '../utilities/types'

registerLocale('ja', ja)

export const DateInput = (props: DateInputProps) => {
  return (
    <DatePicker
      selected={props.selectedState}
      onChange={props.selectHandler}
      locale="ja"
      dateFormat='yyyy-MM-dd'
    />
  )
}