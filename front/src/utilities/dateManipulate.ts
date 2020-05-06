export const getLastDayOfOneYearLater = (date: Date) => {
  let newDate = new Date()
  newDate.setFullYear(date.getFullYear() + 1)
  newDate.setMonth(date.getMonth())
  newDate.setDate(0)
  return newDate
}

export const getLastDateOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export const getFirstDateOfNextMonth = (date: Date) => {
  let newDate = new Date()
  newDate.setFullYear(date.getFullYear())
  newDate.setMonth(date.getMonth() + 1)
  newDate.setDate(0)
  newDate.setDate(newDate.getDate() + 1)
  return newDate
}

export const dateToYYYYMMDDStr = (date: Date) => {
  const year = date.getFullYear()
  const day = date.getDate()
  const month = date.getMonth() + 1
  if(day < 10 && month < 10) {
    return `${year}-0${month}-0${day}`
  } else if(day<10 && month >= 10) {
    return `${year}-${month}-0${day}`
  } else if(day>=10 && month < 10) {
    return `${year}-0${month}-${day}`
  } else {
    return `${year}-${month}-${day}`
  }
}