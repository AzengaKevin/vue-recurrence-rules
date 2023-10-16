<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const links = computed(() =>
  [
    {
      label: 'Home',
      name: 'home'
    },
    {
      label: 'Documentation',
      name: 'documentation'
    },
    {
      label: 'Contact',
      name: 'contact'
    }
  ].map(({ name, label }) => ({ name, label, active: name == route.name }))
)
</script>

<template>
  <header
    class="d-flex justify-content-center py-3 border-bottom sticky-top bg-light bg-opacity-75"
  >
    <ul class="nav nav-pills">
      <li v-for="{ name, label, active } in links" :key="name" class="nav-item">
        <router-link
          :to="{ name }"
          class="nav-link"
          :class="{ active: active }"
          :aria-current="active"
          >{{ label }}</router-link
        >
      </li>
    </ul>
  </header>
  <RouterView />
</template>
