// common
export type NumberOrString = Number | String // railsからのデータが何か分からないときはこれを使う

// reducers
export interface LoginReducerState {
  loggedIn: boolean
}

export interface LoginReducerDispatch {
  login: any
}

export interface LoginReducerDispatchType {
  type: string
}

export interface LoginReducerProps extends LoginReducerState, LoginReducerDispatch {}

// props
export interface ReduxProps {
  state: object
  login: any
}

export interface SnackbarProps {
  open: boolean
  autoHideDuration: number
  onClose: any
  message: string
}

export interface TableHeaderCell {
  fiscal_year: number
  fiscal_year_month: number
}

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
  month: number
  fiscal_year: number
  fiscal_year_month: number
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