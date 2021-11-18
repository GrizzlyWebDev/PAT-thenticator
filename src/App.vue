<template>
  <v-app>
    <v-main>
        <div class="page-bg"></div>
        <div class="animation-wrapper">
          <div class="particle particle-1"></div>
          <div class="particle particle-2"></div>
          <div class="particle particle-3"></div>
          <div class="particle particle-4"></div>
        </div>
       <PAT />
    </v-main>
  </v-app>
</template>

<script>
import PAT from './components/PAT.vue'

export default {
  name: 'App',
  components: {
    PAT
  }
}
</script>

<style>

</style>
