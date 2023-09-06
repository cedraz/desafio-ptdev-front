export default function changeDate(date) {
  const dateObj = new Date(date)

  const year = dateObj.getFullYear()
  let month = ''
  let day = ''
  if (dateObj.getMonth() >= 10) {
    month = `${dateObj.getMonth() + 1}`
  } else {
    month = `0${dateObj.getMonth() + 1}`
  }

  if (dateObj.getDate() >= 10) {
    day = `${dateObj.getDate()}`
  } else {
    day = `0${dateObj.getDate()}`
  }

  return `${day}/${month}/${year}`
}
