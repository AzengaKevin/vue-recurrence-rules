import moment from 'moment-timezone'

export default function useDatetime() {
  const getDatetimeLocal = () => {
    return moment().format('YYYY-MM-DDTHH:mm')
  }

  return {
    getDatetimeLocal
  }
}
