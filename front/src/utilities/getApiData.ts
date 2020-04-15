import axios from 'axios'

interface getApiDataType {
  data: any[]
}

export const getApiData = async (url: string): Promise<getApiDataType | void> => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch {
    console.error('something wrong')
  }
}