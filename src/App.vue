<template>
  <MainHeader />
  <main>
    <div class="container">
      <router-view />
    </div>
  </main>
  <MainFooter />
</template>

<script lang="ts" setup>
import MainHeader from "@/components/navigation/MainHeader.vue";
import MainFooter from "@/components/navigation/MainFooter.vue";
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  max-width: 100%;
  min-height: 100vh;
  position: relative;
}
main {
  flex: 1 0 auto;
  max-width: 100%;
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  .container {
    width: 100%;
    padding-right: remSize(15px);
    padding-left: remSize(15px);
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
