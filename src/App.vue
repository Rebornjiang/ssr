<template>
  <div id="app">
    <h1>{{ new Date() }}</h1>
    <router-link to="/about">Abount</router-link>
    <router-link to="/">Home</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      msg: "sdf",
    };
  },
};
</script>
<style></style>
