<template>
  <div id="app">
    <h1>content ==> {{ msg }}</h1>
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
