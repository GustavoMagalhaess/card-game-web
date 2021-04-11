<template>
  <div class="winners">
    <h2>Winners</h2>
    <ul>
      <li v-for="winner in winners" :key="winner.id">
        <strong>{{ winner.name }}</strong>
        <ul>
          <li v-for="score in winner.scores" :key="score.id">
            {{ score.player_hand }} | {{ score.generated_hand }} |
            {{ score.player_score }} | {{ score.generated_score }}
          </li>
        </ul>
      </li>
    </ul>
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
      console.log(isWinner);
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
<style scoped></style>
