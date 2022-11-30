<template>
  <div id="app">
    <h1>{{ new Date() }}</h1>
    <h1>HHHH{{ msg }}</h1>
    <h2>3</h2>
    <input type="text" v-model="msg" />
    <Son />
  </div>
</template>

<script>
import Son from "./Son.vue";
export default {
  name: "App",
  components: { Son },
  data() {
    return {
      msg: "sdf",
    };
  },
};
</script>
<style></style>
