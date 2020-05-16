type NumberOrString = ( string | number )

export const digitComma = (arg: NumberOrString) => {

  const typeUnifier = (arg: NumberOrString): string => {
    if (typeof arg === 'number') {
      return String(arg)
    } else {
      return arg
    }
  }
  
  const numberChars = typeUnifier(arg).split('')
  let numberCharsOutput = []
  let counter = 1
  for (let index = numberChars.length - 1 ; index >= 0; index--) {
    numberCharsOutput.unshift(numberChars[index])
    if(index!==0) {
      if (counter % 3 === 0) numberCharsOutput.unshift(',')
      counter++
    }
  }

  return numberCharsOutput.join('')

}