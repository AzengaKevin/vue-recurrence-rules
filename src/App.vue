<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header
    class="d-flex justify-content-center py-3 border-bottom sticky-top bg-light bg-opacity-75"
  >
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/" class="nav-link active" aria-current="page">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/documentation" class="nav-link">Documentation</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/contact" class="nav-link">Contact</router-link>
      </li>
    </ul>
  </header>
  <RouterView />
</template>
