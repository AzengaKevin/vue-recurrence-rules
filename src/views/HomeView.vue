<script setup>
import { computed, reactive } from 'vue'
import { frequencyOptions, weekDays, months, monthDayOptions, endOptions } from '@/data/recurrency'

import useDatetime from '@/composables/datetime'
import pluralize from 'pluralize'

const { getDatetimeLocal } = useDatetime()

const recurrency = reactive({
  start: getDatetimeLocal(),
  frequency: null,
  interval: 1,
  by: {
    days: [],
    monthDays: [],
    months: [],
    setPos: []
  },
  recurDates: null,
  excludeDate: null,
  timeZoneIdentifier: null,
  endType: 'Never',
  until: null,
  count: null
})

const intervalTime = computed(() => {
  const localIntervalTime = frequencyOptions.find((option) => option.value === recurrency.frequency)

  return localIntervalTime ? pluralize(localIntervalTime.time, recurrency.interval) : ''
})

const recurringWeekly = computed(() => recurrency.frequency === 'Weekly')

const recurringMonthly = computed(() => recurrency.frequency === 'Monthly')

const recurringYearly = computed(() => recurrency.frequency === 'Yearly')

const endTypeUntil = computed(() => recurrency.endType === 'Until')

const endTypeCount = computed(() => recurrency.endType === 'Count')
</script>
<template>
  <main>
    <div class="container py-4">
      <div class="row row-cols-1 g-3">
        <div class="col">
          <label for="start" class="form-label fw-bold">Start</label>
          <input type="datetime-local" v-model="recurrency.start" id="start" class="form-control" />
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
          <select v-model="recurrency.by.days" id="by-days" class="form-select" size="5" multiple>
            <option :value="null" disabled>--Select--</option>
            <option v-for="option in weekDays" :key="option.value" :value="option.value">
              {{ option.name }}
            </option>
          </select>
        </div>

        <div v-if="recurringMonthly" class="col">
          <label for="by-month-days" class="form-label fw-bold">Month Days</label>
          <select
            v-model="recurrency.by.monthDays"
            id="by-month-days"
            class="form-select"
            size="5"
            multiple
          >
            <option :value="null" disabled>--Select--</option>
            <option v-for="option in monthDayOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div v-if="recurringYearly" class="col">
          <label for="by-months" class="form-label fw-bold">Months</label>
          <select
            v-model="recurrency.by.months"
            id="by-months"
            class="form-select"
            size="5"
            multiple
          >
            <option :value="null" disabled>--Select--</option>
            <option v-for="option in months" :key="option.value" :value="option.value">
              {{ option.name }}
            </option>
          </select>
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
                      v-model="recurrency.endType"
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
