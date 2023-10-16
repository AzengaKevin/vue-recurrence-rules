<script setup>
import { reactive } from 'vue'
import {
  frequencyOptions,
  weekDays,
  months,
  weekStartOptions,
  minutesOptions,
  secondsOptions,
  hoursOptions,
  monthDayOptions
} from '@/data/recurrency'

const recurrency = reactive({
  start: null,
  startTime: null,
  endTime: null,
  frequency: null,
  interval: null,
  count: null,
  until: null,
  by: {
    seconds: [], // Array<Integer>
    minutes: [], // Array<Integer>
    hours: [], // Array<Integer>
    days: [], // Array<(MO,TU,WE,TH,FR,SA,SU)>
    monthDays: [], // Array<Integer>
    months: [], // Array<Integer>
    setPos: []
  },
  weekStart: null, // (SU|MO)
  recurDates: null, // Array
  excludeDate: null, // Array
  timeZoneIdentifier: null
})
</script>
<template>
  <main>
    <div class="container py-4">
      <div class="row row-cols-1 g-3">
        <div class="col">
          <label for="start" class="form-label fw-bold">Start</label>
          <input type="date" v-model="recurrency.start" id="start" class="form-control" />
        </div>
        <div class="col">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div class="col">
              <label for="start-time" class="form-label fw-bold">Start Time</label>
              <input
                type="time"
                v-model="recurrency.startTime"
                id="start-time"
                class="form-control"
              />
            </div>
            <div class="col">
              <label for="end-time" class="form-label fw-bold">End Time</label>
              <input type="time" v-model="recurrency.endTime" id="end-time" class="form-control" />
            </div>
          </div>
        </div>
        <div class="col">
          <label for="frequency" class="form-label fw-semibold">Frequency</label>
          <select v-model="recurrency.frequency" id="frequency" class="form-select">
            <option :value="null" disabled>--Select--</option>
            <option v-for="option in frequencyOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div class="col">
          <label for="interval" class="form-label fw-semibold">Interval</label>
          <div class="input-group">
            <input
              type="number"
              min="1"
              v-model="recurrency.interval"
              id="interval"
              class="form-control"
            />
            <span class="input-group-text">{{ recurrency.frequency }}</span>
          </div>
        </div>

        <div class="col">
          <label for="count" class="form-label fw-semibold">Count</label>
          <input type="number" min="1" v-model="recurrency.count" id="count" class="form-control" />
        </div>

        <div class="col">
          <label for="until" class="form-label fw-bold">Until</label>
          <input type="date" v-model="recurrency.until" id="until" class="form-control" />
        </div>

        <div class="col">
          <label for="week-start" class="form-label fw-bold">Week Start</label>
          <select v-model="recurrency.weekStart" id="week-start" class="form-select">
            <option :value="null" disabled>--Select--</option>
            <option v-for="option in weekStartOptions" :key="option.value" :value="option.value">
              {{ option.name }}
            </option>
          </select>
        </div>

        <div class="col">
          <label for="by-seconds" class="form-label fw-bold">Seconds</label>
          <select
            v-model="recurrency.by.seconds"
            id="by-seconds"
            class="form-select"
            size="5"
            multiple
          >
            <option :value="null" disabled>--Select--</option>
            <option v-for="option in secondsOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div class="col">
          <label for="by-minutes" class="form-label fw-bold">Minutes</label>
          <select
            v-model="recurrency.by.minutes"
            id="by-minutes"
            class="form-select"
            size="5"
            multiple
          >
            <option :value="null" disabled>--Select--</option>
            <option v-for="option in minutesOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div class="col">
          <label for="by-hours" class="form-label fw-bold">Hours</label>
          <select v-model="recurrency.by.hours" id="by-hours" class="form-select" size="5" multiple>
            <option :value="null" disabled>--Select--</option>
            <option v-for="option in hoursOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div class="col">
          <label for="by-days" class="form-label fw-bold">Days</label>
          <select v-model="recurrency.by.days" id="by-days" class="form-select" size="5" multiple>
            <option :value="null" disabled>--Select--</option>
            <option v-for="option in weekDays" :key="option.value" :value="option.value">
              {{ option.name }}
            </option>
          </select>
        </div>

        <div class="col">
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

        <div class="col">
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
      </div>
    </div>
  </main>
</template>
