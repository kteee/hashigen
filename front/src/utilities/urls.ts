// デフォルトのrails側のURL
const defaultDevServerUrl = 'http://localhost:3000'

// 環境変数ファイルの設定が読めたらそれを返すけど、だめならデフォルトを返す
const makeBaseUrl = () => {
  if (process.env.REACT_APP_BASE_URL) {
    return process.env.REACT_APP_BASE_URL
  } else {
    return defaultDevServerUrl
  }
}

const baseUrl = makeBaseUrl()

export const GET_ASSET_ITEM_URL = `${baseUrl}/api/masters/asset-item`
export const GET_USEFUL_LIFE_URL = `${baseUrl}/api/masters/useful-life`
export const GET_DEP_METHOD_URL = `${baseUrl}/api/masters/dep-method`
export const POST_NEW_ASSET_URL = `${baseUrl}/api/assets/create`