<script setup>
import { ref, computed, watch } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption
} from '@headlessui/vue'
import debounce from 'lodash/debounce'

const props = defineProps({
  modelValue: Array,
  options: {
    type: Array,
    default: () => []
  },
  multiple: Boolean,
  loadOptions: Function
})

const emit = defineEmits(['update:modelValue'])

const options = ref(props.options)

const isLoading = ref(false)

let query = ref('')

const selectedOptions = ref([])

const setSelectedOptions = (value) => {
  if (!selectedOptions.value.find((o) => o.value === value.value)) {
    selectedOptions.value.push(value)
  }

  emit('update:modelValue', selectedOptions.value)
}

watch(
  query,
  debounce((q) => {
    if (props.loadOptions) {
      isLoading.value = true

      props.loadOptions(q, (results) => {
        options.value = results

        isLoading.value = false
      })
    }
  }, 300),
  { immediate: true }
)

let filteredOptions = computed(() =>
  query.value === ''
    ? options.value
    : options.value.filter((option) =>
        option.label
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)
</script>

<template>
  <Combobox
    as="div"
    :model-value="props.modelValue"
    @update:model-value="setSelectedOptions"
    by="value"
    :multiple="multiple"
  >
    <ul class="list-unstyled d-flex flex-wrap gap-2" v-if="selectedOptions.length > 0">
      <li v-for="option in selectedOptions" :key="option.value">
        <span class="badge text-bg-primary">{{ option.label }}</span>
      </li>
    </ul>

    <div class="position-relative">
      <div class="position-relative w-100 overflow-hidden rounded bg-white text-left shadow-md">
        <ComboboxInput class="form-control" @change="query = $event.target.value" />
        <ComboboxButton
          class="position-absolute top-0 bottom-0 end-0 d-flex align-items-center btn pe-2"
        >
          <span class="c-h-5 c-w-5 text-secondary"
            ><font-awesome-icon icon="fa-solid fa-chevron-down"
          /></span>
        </ComboboxButton>
      </div>
      <ComboboxOptions
        class="position-absolute z-1 list-unstyled mt-1 max-vh-25 w-100 overflow-auto rounded bg-white py-1 shadow-sm"
      >
        <div
          v-if="filteredOptions.length === 0 && !isLoading"
          class="position-relative select-none py-2 px-4 text-muted"
        >
          Nothing found.
        </div>
        <div v-if="isLoading" class="position-relative select-none py-2 px-4 text-muted">
          Loading...
        </div>

        <template v-if="!isLoading">
          <ComboboxOption
            v-for="option in filteredOptions"
            as="template"
            :key="option.value"
            :value="option"
            v-slot="{ selected, active }"
          >
            <li
              class="position-relative py-2 ps-4 pe-2"
              :class="{
                'bg-primary text-white': active,
                'text-dark': !active
              }"
            >
              <span
                class="d-block truncate"
                :class="{ 'fw-medium': selected, 'fw-normal': !selected }"
              >
                {{ option.label }}
              </span>
              <span
                v-if="selected"
                class="position-absolute top-0 bottom-0 end-0 d-flex align-items-center ps-3"
                :class="{ 'text-white': active, 'text-primary': !active }"
              >
                <span class="c-h-5 c-w-5"><font-awesome-icon icon="fa-solid fa-check" /></span>
              </span>
            </li>
          </ComboboxOption>
        </template>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
