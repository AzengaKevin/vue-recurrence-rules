import moment from 'moment-timezone'
import { ref } from 'vue'

export default function useDatetime() {
  const day = ref(moment().day())

  const monthDay = ref(moment().date())

  const month = ref(moment().month())

  const datetimeLocal = ref(moment().format('YYYY-MM-DDTHH:mm'))

  return {
    datetimeLocal,
    monthDay,
    month,
    day
  }
}
