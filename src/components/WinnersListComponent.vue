<template>
  <div class="container">
    <h2>Winners</h2>
    <table
      class="table table-sm table-responsive-sm table-striped"
      v-for="winner in winners"
      :key="winner.id"
    >
      <thead>
        <tr>
          <th colspan="4">{{ winner.name }}</th>
        </tr>
        <tr>
          <th scope="col">Hand</th>
          <th scope="col">Generated Hand</th>
          <th scope="col">Score</th>
          <th scope="col">Generated Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="score in winner.scores" :key="score.id">
          <td>{{ score.player_hand }}</td>
          <td>{{ score.generated_hand }}</td>
          <td>{{ score.player_score }}</td>
          <td>{{ score.generated_score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  store,
  name: "WinnersListComponent",
  props: {
    isWinner: {
      type: Boolean,
    },
  },
  computed: {
    winners() {
      return store.state.winners;
    },
  },
  methods: {
    getWinners() {
      store.dispatch("getWinners");
    },
  },
  created() {
    this.getWinners();
  },
  watch: {
    isWinner: function (isWinner) {
      if (isWinner) {
        this.getWinners();
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2,
table {
  margin-bottom: 50px;
}
</style>
