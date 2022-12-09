<template>
  <div>
    <h1>This is Abount Page!!!</h1>

    <h1>Content：</h1>
    <ul>
      <li v-for="item in posts">
       {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Abount",
  metaInfo: {
    title: "hello world Reborn",
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["posts"]),
  },
  components: {},
  mounted() {},
  serverPrefetch() {
    return this.getArticles();
  },
  methods: {
    ...mapActions(["getArticles"]),
  },
};
</script>
<style lang="scss" scoped></style>
