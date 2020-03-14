<template>
  <div>
    <the-header />
    <main class="main-content">
      <nuxt />
    </main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader.vue';
export default {
  components: {
    TheHeader
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  body {
    font-family:'Liu Jian Mao Cao', sans-serif;
  }
  .main-content {
    margin-top: 4.5rem;
  }
</style>
