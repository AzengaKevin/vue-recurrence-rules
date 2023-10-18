import moment from 'moment-timezone'
import { ref } from 'vue'

export default function useDatetime() {
  const day = ref(moment().day())

  const monthDay = ref(moment().date())

  const month = ref(moment().month())

  const datetimeLocal = ref(moment().format('YYYY-MM-DDTHH:mm'))

  const convertToISO8601 = (dateString) => {
    const parsedDate = moment(dateString)

    // Format the date in ISO 8601 format
    const iso8601Date = parsedDate.format('YYYYMMDDTHHMMSS')

    // Append the 'Z' designator for UTC
    return iso8601Date + 'Z'
  }

  return {
    convertToISO8601,
    datetimeLocal,
    monthDay,
    month,
    day
  }
}
