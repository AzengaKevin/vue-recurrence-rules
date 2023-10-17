export const frequencyOptions = [
  {
    value: 'Daily',
    time: 'day'
  },
  {
    value: 'Weekly',
    time: 'week'
  },
  {
    value: 'Monthly',
    time: 'month'
  },
  {
    value: 'Yearly',
    time: 'year'
  }
]

export const weekDays = [
  {
    iteration: 1,
    name: 'Sunday',
    value: 'SU'
  },
  {
    iteration: 2,
    name: 'Monday',
    value: 'SU'
  },
  {
    iteration: 3,
    name: 'Tuesday',
    value: 'TU'
  },
  {
    iteration: 4,
    name: 'Wednesday',
    value: 'WE'
  },
  {
    iteration: 5,
    name: 'Thursday',
    value: 'TH'
  },
  {
    iteration: 6,
    name: 'Friday',
    value: 'FR'
  },
  {
    iteration: 7,
    name: 'Saturday',
    value: 'SA'
  }
]

export const weekStartOptions = weekDays.filter((d) => ['SU', 'MO'].includes(d.value))

export const months = [
  {
    iteration: 1,
    name: 'January',
    value: 'JAN'
  },
  {
    iteration: 2,
    name: 'February',
    value: 'FEB'
  },
  {
    iteration: 3,
    name: 'March',
    value: 'MAR'
  },
  {
    iteration: 4,
    name: 'April',
    value: 'APR'
  },
  {
    iteration: 5,
    name: 'May',
    value: 'MAY'
  },
  {
    iteration: 6,
    name: 'June',
    value: 'JUN'
  },
  {
    iteration: 7,
    name: 'July',
    value: 'JUL'
  },
  {
    iteration: 8,
    name: 'Augast',
    value: 'AUG'
  },
  {
    iteration: 9,
    name: 'September',
    value: 'SEP'
  },
  {
    iteration: 10,
    name: 'October',
    value: 'OCT'
  },
  {
    iteration: 11,
    name: 'November',
    value: 'NOV'
  },
  {
    iteration: 12,
    name: 'December',
    value: 'DEC'
  }
]

const oneThroughWhat = (what) => {
  const elements = []

  for (let count = 1; count <= what; count++) {
    elements.push(count)
  }

  return elements
}

export const secondsOptions = oneThroughWhat(60)

export const minutesOptions = oneThroughWhat(60)

export const hoursOptions = oneThroughWhat(24)

export const monthDayOptions = oneThroughWhat(31)

export const endOptions = [
  {
    label: 'Never',
    value: 'Never'
  },
  {
    label: 'Until',
    value: 'Until'
  },
  {
    label: 'After Occurrences',
    value: 'Count'
  }
]
