<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { frequencyOptions, weekDays, months, monthDayOptions, endOptions } from '@/data/recurrency'
import AppCombobox from '@/components/AppCombobox.vue'

import useDatetime from '@/composables/datetime'
import pluralize from 'pluralize'

const { datetimeLocal, day, monthDay, month, convertToISO8601 } = useDatetime()

const recurrency = reactive({
  frequency: null,
  interval: 1,
  by: {
    days: [weekDays.find((_, index) => index === day.value)],
    monthDays: [monthDayOptions.find((o) => o.value === monthDay.value)],
    months: [months.find((_, index) => index === month.value)]
  },
  until: null,
  count: null
})

const endType = ref('Never')

const start = ref(datetimeLocal)

watch(
  endType,
  (oldValue, newValue) => {
    if (oldValue !== newValue) {
      recurrency.count = null

      recurrency.until = null
    }
  },
  { deep: true }
)

const intervalTime = computed(() => {
  const localIntervalTime = frequencyOptions.find((option) => option.value === recurrency.frequency)

  return localIntervalTime ? pluralize(localIntervalTime.time, recurrency.interval) : ''
})

const recurringWeekly = computed(() => recurrency.frequency === 'Weekly')

const recurringMonthly = computed(() => recurrency.frequency === 'Monthly')

const recurringYearly = computed(() => recurrency.frequency === 'Yearly')

const endTypeUntil = computed(() => endType.value === 'Until')

const endTypeCount = computed(() => endType.value === 'Count')

const theRule = computed(() => {
  if (!recurrency.frequency) return null

  const parts = []

  switch (recurrency.frequency) {
    case 'Daily':
      if (recurrency.frequency) parts.push(`FREQ=${recurrency.frequency}`)

      if (recurrency.interval) parts.push(`INTERVAL=${recurrency.interval}`)

      if (recurrency.count) parts.push(`COUNT=${recurrency.count}`)

      if (recurrency.until) parts.push(`UNTIL=${convertToISO8601(recurrency.until)}`)

      break

    case 'Weekly':
      if (recurrency.frequency) parts.push(`FREQ=${recurrency.frequency}`)

      if (recurrency.interval) parts.push(`INTERVAL=${recurrency.interval}`)

      if (recurrency.by.days)
        parts.push(`BYDAY=${recurrency.by.days.map((o) => o.value).join(',')}`)

      if (recurrency.count) parts.push(`COUNT=${recurrency.count}`)

      if (recurrency.until) parts.push(`UNTIL=${convertToISO8601(recurrency.until)}`)

      break

    case 'Monthly':
      if (recurrency.frequency) parts.push(`FREQ=${recurrency.frequency}`)

      if (recurrency.interval) parts.push(`INTERVAL=${recurrency.interval}`)

      if (recurrency.by.monthDays)
        parts.push(`BYMONTHDAY=${recurrency.by.monthDays.map((o) => o.value).join(',')}`)

      if (recurrency.count) parts.push(`COUNT=${recurrency.count}`)

      if (recurrency.until) parts.push(`UNTIL=${convertToISO8601(recurrency.until)}`)

      break

    case 'Yearly':
      if (recurrency.frequency) parts.push(`FREQ=${recurrency.frequency}`)

      if (recurrency.interval) parts.push(`INTERVAL=${recurrency.interval}`)

      if (recurrency.by.months)
        parts.push(`BYMONTH=${recurrency.by.months.map((o) => o.iteration).join(',')}`)

      if (recurrency.count) parts.push(`COUNT=${recurrency.count}`)

      if (recurrency.until) parts.push(`UNTIL=${convertToISO8601(recurrency.until)}`)

      break

    default:
      break
  }

  return parts.join(';')
})
</script>
<template>
  <main>
    <div class="container py-4">
      <div class="row row-cols-1 g-3">
        <div class="col">
          <output class="fw-bold">{{ theRule }}</output>
        </div>
        <div class="col">
          <label for="start" class="form-label fw-bold">Start</label>
          <input type="datetime-local" v-model="start" id="start" class="form-control" />
        </div>

        <div class="col">
          <label for="frequency" class="form-label fw-semibold">Frequency</label>
          <select v-model="recurrency.frequency" id="frequency" class="form-select">
            <option :value="null" disabled>--Select--</option>
            <option v-for="option in frequencyOptions" :key="option.value" :value="option.value">
              {{ option.value }}
            </option>
          </select>
        </div>

        <div class="col" v-if="recurrency.frequency">
          <label for="interval" class="form-label fw-semibold">Interval</label>
          <div class="input-group">
            <input
              type="number"
              min="1"
              step="1"
              v-model.number="recurrency.interval"
              id="interval"
              class="form-control"
            />
            <span v-if="intervalTime" class="input-group-text">{{ intervalTime }}</span>
          </div>
        </div>

        <div v-if="recurringWeekly" class="col">
          <label for="by-days" class="form-label fw-bold">Days</label>
          <app-combobox id="by-days" v-model="recurrency.by.days" :options="weekDays" />
        </div>

        <div v-if="recurringMonthly || recurringYearly" class="col">
          <label for="by-month-days" class="form-label fw-bold">Month Days</label>
          <app-combobox
            id="by-month-days"
            v-model="recurrency.by.monthDays"
            :options="monthDayOptions"
          />
        </div>

        <div v-if="recurringYearly" class="col">
          <label for="by-months" class="form-label fw-bold">Months</label>
          <app-combobox id="by-months" v-model="recurrency.by.months" :options="months" />
        </div>

        <fieldset class="col">
          <legend class="my-0 fw-semibold fs-6">End</legend>
          <div class="row row-cols-1 g-3">
            <div class="col">
              <div class="d-flex gap-3 flex-wrap">
                <div v-for="option in endOptions" :key="option">
                  <div class="form-check">
                    <input
                      type="radio"
                      name="end"
                      v-model="endType"
                      :id="`end${option.value}-option`"
                      :value="option.value"
                      class="form-check-input"
                    />
                    <label :for="`end${option.value}-option`" class="form-check-label text-muted">{{
                      option.label
                    }}</label>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="endTypeCount" class="col">
              <label for="count" class="form-label fw-semibold">After Occurrences Count</label>
              <input
                type="number"
                min="1"
                step="1"
                v-model.number="recurrency.count"
                id="count"
                class="form-control"
              />
            </div>

            <div v-if="endTypeUntil" class="col">
              <label for="until" class="form-label fw-bold">Until</label>
              <input type="date" v-model="recurrency.until" id="until" class="form-control" />
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </main>
</template>
