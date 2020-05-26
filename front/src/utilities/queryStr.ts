interface QueryStrObj {
  [prop: string]: string
}

export const makeQueryStr = (queryStrObj: QueryStrObj) => {
  let queryStr = ''
  for(const prop in queryStrObj) {
    if(queryStrObj[prop]) {
      if(queryStr === '') {
        queryStr = `?${prop}=${queryStrObj[prop]}`
      } else {
        queryStr = `${queryStr}&${prop}=${queryStrObj[prop]}`
      }
    }
  }
  return queryStr  
}