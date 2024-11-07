export const getAvatarWords = () => {
  const email = window.localStorage.getItem('email')
  console.log(email)

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return ''
  }

  let words = email.substring(0, 2).toUpperCase()

  if (words.length === 1) {
    words += words
  }

  return words
}

export const getChartDescription = () => {
  const date = new Date()

  const monthsNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return `January - ${monthsNames[date.getMonth()]} ${date.getFullYear()}`
}
