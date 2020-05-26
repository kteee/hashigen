/*************************/
/* reducers **************/ 
/*************************/
export interface storeState {
  login: LoginReducerState
  message: MessageReducerState
}

export interface LoginReducerState {
  loggedIn: boolean
  accountId: number|undefined
}

export interface MessageReducerState {
  open: boolean
  message: string
}

export interface LoginReducerDispatch {
  login: any
}

export interface LoginReducerDispatchType {
  type: string
}

export interface LoginReducerProps extends LoginReducerState, LoginReducerDispatch {}



/*************************/
/* props *****************/ 
/*************************/

export interface ReactSelect  {
  value: string
  label: string
}

export interface AssetListToSearchProps {
  setAssetGroupId(id: string): void
  setDepMethodId(id: string): void
  getAssets(): void
}

export interface MenuListItemsProps {
  name: string
  link_to: string
}

export interface ReduxProps {
  state: object
  login: any
}

export interface TableHeaderCell {
  fiscal_year: number
  fiscal_year_month: number
}

export interface MonthlyTablePeriodProps {
  month: number
  monthStartDate: String
  monthEndDate: String
}

export interface DateInputProps {
  selectedState: any
  selectHandler: any
}

export interface DepreciationProjectionProps {
  assetId: number | string
  tableHeaderCells: TableHeaderCell[]
  setTableHeaderCells: any
}

export interface NewAssetItem {
  asset_item_id: number
  name: string
  acquisition_date: string
  depreciation_start_date: string
  depreciation_method_id: number
  year_start_book_value: number
  location_id: number
  unit_value: number
  amount: number
  acquisition_value: number
}

export interface NewAssetProcessProps {
  stepOne: AssetListItemResponse
  stepTwo: NewAssetItem
}

type setSelectedItemArg = (prevState: NewAssetProcessProps) => {
  stepOne: AssetListItemResponse
  stepTwo: NewAssetItem
}

export interface NewAssetStepProps {
  selectedItem: NewAssetProcessProps
  setSelectedItem(arg: setSelectedItemArg): void
}

export interface DepreciationMonth extends MonthlyPeriodResponse {
  checked: boolean
}

export interface DepreciationProcessProps {
  selectedMonths: DepreciationMonth[]
  setSelectedMonths: any
}

export interface MyModalProps {
  open: boolean
  onClose: any
  body: any
}


/*************************/
/* usestate **************/ 
/*************************/
type UseStateArgs = (string | number)
export type UseState<T> = (T | undefined)
export type UseStateCallback = { (args: UseStateArgs) :void }



/*************************/
/* api fetch *************/ 
/*************************/

interface TransactionResponseInner {
  type: string
  status: string
  value: number
}

export interface TransactionResponse {
  [key: string]: TransactionResponseInner[]
}



export interface AssetGroupResponse {
  id: number
  name: string
  created_at: string
  updated_at: string
  asset_type_id: number 
}

export type NumberOrString = Number | String // railsからのデータが何か分からないときはこれを使う

export interface AssetListItemResponse {
  id: number
  group: string
  item: AssetItemsResponseItemArray
  useful_life: number
}

export interface AssetListItem {
  id: number
  name: string
  acquisition_date: string
  acquisition_value: number
  useful_life: number,
  depreciation_method: string,
  created_at: string,
  updated_at: string
}

export interface AssetDetailAccountingResponse {
  asset_group: AssetGroupResponse
  asset_item: AssetItemsResponse
  asset_type: any
  dep_method: DepMethodResponse
}

export interface AssetDetailDetailResponse {
  acquisition_date: string
  acquisition_value: number
  depreciation_start_date: string
  id: number
  prefecture: string
  city: string
  name: string
  year_start_book_value: number
  created_at: string
  updated_at: string
}

export interface AssetDetailTransactionResponse {
  value: number
  date: string
  status: string
  transaction_type: string
}

export interface AssetDetailResponse {
  accounting: AssetDetailAccountingResponse
  detail: AssetDetailDetailResponse
  transactions: AssetDetailTransactionResponse[]
}

export interface DepreciationPreviewResponse {
  fy: number
  dep: number
  book_val: number
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

export interface AccountingPeriodResponse {
  id: number
  start: string
  end: string
  status: number
}

export interface MonthlyPeriodResponse {
  id: number
  accounting_period_id: number
  start: string
  end: string
}

export interface DepreciationMethodsProps {
  id: string
  name: string
  display_name: string
}

export interface AssetGroupResponse {
  asset_type_id: number
  created_at: string
  id: number
  name: string
  updated_at: string
}

export interface DepMethodResponse {
  created_at: string
  display_name: string
  id: number
  name: string
  updated_at: string
}

type AssetItemsResponseItemArray = [] | [
  string, string, string, string, string, string, string
]

export interface AssetItemsResponse {
  asset_group_id: number
  created_at: string
  id: number
  item: string
  updated_at: string
  useful_life_id: number
}

export interface AssetDepreciationResponse {
  id: number
  date: string
  asset_name: string
  amount: number
}