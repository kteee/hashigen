import React, { useState, useEffect, ChangeEvent } from 'react';
import Select from 'react-select'
import axios from 'axios'

import { setHeaders } from '../../../../utilities/auth'
import { SDl, SDWrapper, SDt, SDd } from '../../../../materials/Definition'
import { GET_DEP_METHODS_URL } from '../../../../utilities/urls'
import { ReactSelect, DepreciationMethodsProps } from '../../../../utilities/types'

interface DepMethodProps {
  onChangeFunc(id: string): void
}

export const DepMethod = (props: DepMethodProps) => {

  const [depMethods, setDepMethods] = useState<ReactSelect[]>()

  const getDepMethods = async () => {
    const headers = setHeaders()
    const { data } = await axios.get(
      GET_DEP_METHODS_URL,
      headers
    )
    const customData = data.map((item: DepreciationMethodsProps) => ({
      value: item.id,
      label: item.display_name
    }))
    setDepMethods(customData)
  }

  useEffect(() => {
    getDepMethods()
  }, [])

  const onChangeHandler = (option: any) => {
    props.onChangeFunc(option.value.toString())
  }

  return (
    <SDWrapper borderBottom='none'>
      <SDt>
        償却方法
      </SDt>
      <SDd width='20em'>
        <Select
          options={depMethods}
          onChange={onChangeHandler}
        />
      </SDd>
  </SDWrapper>
  )
}