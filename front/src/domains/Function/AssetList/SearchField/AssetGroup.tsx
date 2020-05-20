import React, { useState, useEffect, ChangeEvent } from 'react';
import Select from 'react-select'
import axios from 'axios'

import { setHeaders } from '../../../../utilities/auth'
import { SDl, SDWrapper, SDt, SDd } from '../../../../materials/Definition'
import { GET_ASSET_GROUPS_URL } from '../../../../utilities/urls'
import { ReactSelect, AssetGroupResponse } from '../../../../utilities/types'

interface AssetGroupProps {
  onChangeFunc(id: string): void
}

export const AssetGroup = (props: AssetGroupProps) => {

  const [assetGroups, setAssetGroups] = useState<ReactSelect[]>()

  const getAssetGroups = async () => {
    const headers = setHeaders()
    const { data } = await axios.get(
      GET_ASSET_GROUPS_URL,
      headers
    )
    const customData = data.map((item: AssetGroupResponse) => ({
      value: item.id,
      label: item.name
    }))
    setAssetGroups(customData)
  }

  useEffect(() => {
    getAssetGroups()
  }, [])

  const onChangeHandler = (option: any) => {
    props.onChangeFunc(option.value.toString())
  }

  return (
    <SDWrapper borderBottom='none'>
      <SDt>
        資産グループ
      </SDt>
      <SDd width='20em'>
        <Select
          options={assetGroups}
          onChange={onChangeHandler}
        />
      </SDd>
  </SDWrapper>
  )
}