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
    label: 'Sunday',
    value: 'SU'
  },
  {
    iteration: 2,
    label: 'Monday',
    value: 'SU'
  },
  {
    iteration: 3,
    label: 'Tuesday',
    value: 'TU'
  },
  {
    iteration: 4,
    label: 'Wednesday',
    value: 'WE'
  },
  {
    iteration: 5,
    label: 'Thursday',
    value: 'TH'
  },
  {
    iteration: 6,
    label: 'Friday',
    value: 'FR'
  },
  {
    iteration: 7,
    label: 'Saturday',
    value: 'SA'
  }
]

export const weekStartOptions = weekDays.filter((d) => ['SU', 'MO'].includes(d.value))

export const months = [
  {
    iteration: 1,
    label: 'January',
    value: 'JAN'
  },
  {
    iteration: 2,
    label: 'February',
    value: 'FEB'
  },
  {
    iteration: 3,
    label: 'March',
    value: 'MAR'
  },
  {
    iteration: 4,
    label: 'April',
    value: 'APR'
  },
  {
    iteration: 5,
    label: 'May',
    value: 'MAY'
  },
  {
    iteration: 6,
    label: 'June',
    value: 'JUN'
  },
  {
    iteration: 7,
    label: 'July',
    value: 'JUL'
  },
  {
    iteration: 8,
    label: 'Augast',
    value: 'AUG'
  },
  {
    iteration: 9,
    label: 'September',
    value: 'SEP'
  },
  {
    iteration: 10,
    label: 'October',
    value: 'OCT'
  },
  {
    iteration: 11,
    label: 'November',
    value: 'NOV'
  },
  {
    iteration: 12,
    label: 'December',
    value: 'DEC'
  }
]

const oneThroughWhat = (what) => {
  const elements = []

  for (let count = 1; count <= what; count++) {
    elements.push({
      label: `${count}`,
      value: count
    })
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
