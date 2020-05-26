// デフォルトのrails側のURL
const defaultDevServerUrl = 'http://localhost:5000'

// 環境変数ファイルの設定が読めたらそれを返すけど、だめならデフォルトを返す
const makeBaseUrl = () => {
  if (process.env.REACT_APP_BASE_URL) {
    return process.env.REACT_APP_BASE_URL
  } else {
    return defaultDevServerUrl
  }
}

const baseUrl = makeBaseUrl()

export const GET_ASSET_ITEMS_URL = `${baseUrl}/api/asset-items`
export const GET_USEFUL_LIFE_URL = `${baseUrl}/api/useful-lives`
export const GET_DEP_METHODS_URL = `${baseUrl}/api/dep-methods`
export const GET_ASSET_GROUPS_URL = `${baseUrl}/api/asset-groups`
export const LOCATIONS_URL = `${baseUrl}/api/locations`
export const UNAPPROVED_TRANSACTIONS = `${baseUrl}/api/transactions/unapproved`
export const ASSET_PREVIEW_URL = `${baseUrl}/api/asset/preview`
export const TXNS_URL = `${baseUrl}/api/transactions`
export const ASSETS_URL = `${baseUrl}/api/assets`
export const USERS_URL = `${baseUrl}/api/users`
export const ACCOUNTING_PERIODS_URL = `${baseUrl}/api/accounting-periods`
export const ASSETS_DEPRECIATION_URL = `${baseUrl}/api/assets/depreciation`
export const LOGIN_URL = `${baseUrl}/api/login`
export const SESSION_URL = `${baseUrl}/api/session`
export const ACCOUNTS_URL = `${baseUrl}/api/accounts`
