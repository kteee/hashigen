// common
type NumberOrString = Number | String // railsからのデータが何か分からないときはこれを使う

// props

// useState
type UseStateArgs = (string | number)
export type UseState<T> = (T | undefined)
export type UseStateCallback = { (args: UseStateArgs) :void }

// api fetch
export interface AssetDetailResponse {
  id: NumberOrString 
  name: string
  acquisition_date: NumberOrString
  acquisition_value: number
  useful_life: number
  depreciation_method: string
  created_at: NumberOrString
  updated_at: NumberOrString
}

export interface DepSimulationResponse {
  year: number
  amount: number
}

export interface UsefulLifeResponse {
  id: number
  year: number
  old_same_amount: number
  old_same_ratio: number
  new_same_amount: number
  two_five_zero_same_ratio_base: number
  two_five_zero_same_ratio_guaranteed: number
  two_five_zero_same_ratio_revised: number
  two_zero_zero_same_ratio_base: number
  two_zero_zero_same_ratio_guaranteed: number
  two_zero_zero_same_ratio_revised: number
}