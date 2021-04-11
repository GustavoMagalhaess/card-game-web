<template>
  <div class="game">
    <h1>Game</h1>
    <form @submit.prevent="onSubmit">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        v-model="play.name"
        placeholder="Player Name"
        required
      />
      <label for="hand">Hand</label>
      <input
        type="text"
        id="hand"
        name="hand"
        v-model="play.hand"
        placeholder="Player Hand"
        required
      />
      <button type="submit">Play</button>
    </form>
    <div class="errors">
      <ul>
        <li v-for="error in getErrors" :key="error.id">{{ error }}</li>
      </ul>
    </div>
  </div>
  <div class="score" v-if="this.isWinner">
    <p>Player: {{ this.game.score.player }}</p>
    <p>Generated: {{ this.game.score.generated }}</p>
  </div>
  <div class="winners">
    <WinnersListComponent :isWinner="isWinner" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WinnersListComponent from "@/components/WinnersListComponent.vue";
import api from "@/api";

export default defineComponent({
  name: "GameComponent",
  components: {
    WinnersListComponent,
  },
  data() {
    return {
      play: {
        name: null,
        hand: null,
      },
      game: {},
      isWinner: false,
      errors: [],
    };
  },
  computed: {
    getErrors() {
      let error: unknown[] = [];

      Object.entries(this.errors).forEach(([key, value]) => {
        error.push(value[0]);
      });

      return error;
    },
  },
  methods: {
    async onSubmit() {
      await api
        .post("play", this.play)
        .then((response) => {
          const game = response.data;
          this.game = game || {};
          this.isWinner = game.score.is_winner || false;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
});
</script>
<style>
.errors ul,
.winners ul {
  padding-left: 0;
}
.errors > ul > li,
.winners > ul > li,
.winners > ul > li > ul > li {
  list-style-type: none;
  margin-top: 0.5rem;
  text-align: center;
}
</style>
