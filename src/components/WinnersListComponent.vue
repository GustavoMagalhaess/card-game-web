<template>
  <div class="winners">
    <h2>Winners</h2>
    <div v-for="winner in winners" :key="winner.id">
      <div class="row">
        <div class="col main">{{ winner.name }}</div>
      </div>
      <div class="row">
        <div class="col title">Hand</div>
        <div class="col title">Generated Hand</div>
        <div class="col title">Score</div>
        <div class="col title">Generated Score</div>
      </div>
      <div class="row">
        <div class="content" v-for="score in winner.scores" :key="score.id">
          <div class="col">{{ score.player_hand }}</div>
          <div class="col">{{ score.generated_hand }}</div>
          <div class="col">{{ score.player_score }}</div>
          <div class="col">{{ score.player_score }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import api from "@/api";

export default defineComponent({
  name: "WinnersListComponent",
  props: {
    isWinner: {
      type: Boolean,
      require: false,
    },
  },
  data() {
    return {
      winners: [],
    };
  },
  watch: {
    isWinner: function (isWinner) {
      !isWinner || this.getWinners();
    },
  },
  methods: {
    async getWinners() {
      try {
        const response = await api.getAll("winners");
        this.winners = response.data || [];
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    this.getWinners();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-size: 3em;
}

.row {
  display: block;
  width: 80%;
  margin: 0 auto 10px auto;
  padding-top: 10px;
  border-bottom: 1px solid black;
}

.content:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 1px;
}

.col {
  display: inline-block;
  width: 19%;
  height: 25px;
  padding: 5px;
}

.title {
  font-weight: bold;
  font-size: 1.4em;
}

.main {
  font-weight: bold;
  font-size: 1.8em;
  padding-top: 25px;
  margin-bottom: 10px;
}
</style>
