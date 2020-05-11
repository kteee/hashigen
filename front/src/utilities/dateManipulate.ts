import { MonthlyTablePeriodProps } from './types'

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

export const createMonthlyTable = (monthStartDateArg: Date, monthEndDateArg = getLastDayOfOneYearLater(monthStartDateArg)) => {
  const months = (monthEndDateArg.getFullYear() - monthStartDateArg.getFullYear()) * 12
   + (monthEndDateArg.getMonth() - monthStartDateArg.getMonth())
  const arrayToBeSet: MonthlyTablePeriodProps[] = []
  let monthStartDate = monthStartDateArg
  let monthEndDate = getLastDateOfMonth(monthStartDate)
  for (let index = 0; index <= months; index++) {
    arrayToBeSet.push({
      month: index + 1,
      monthStartDate: dateToYYYYMMDDStr(monthStartDate),
      monthEndDate: dateToYYYYMMDDStr(monthEndDate),
    })
    monthStartDate = getFirstDateOfNextMonth(monthEndDate)
    monthEndDate = getLastDateOfMonth(monthStartDate)
  }
  return arrayToBeSet
}