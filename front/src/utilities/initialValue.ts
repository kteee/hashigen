import { NewAssetProcessProps } from './types'

export const NewAssetInitialState: NewAssetProcessProps = {
  stepOne: {
    id: 0,
    group: '',
    item: [],
    useful_life: 0
  },
  stepTwo: { 
    asset_item_id: 0,
    name: '',
    acquisition_date: '',
    depreciation_start_date: '',
    depreciation_method_id: 0,
    location_id: 0,
    unit_value: 0,
    amount: 0,
    acquisition_value: 0,
    year_start_book_value: 0
  }
}