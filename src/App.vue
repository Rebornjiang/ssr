<template>
  <div id="app">
    <h1>{{new Date()}}</h1>
    <h1>HHHHH{{ msg }}</h1>
    <input type="text" v-model="msg" />
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
