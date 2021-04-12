<template>
  <div class="game">
    <h1>Card Game</h1>
    <div class="form">
      <ul>
        <li>Name is required.</li>
        <li>Enter a hand of cards.</li>
        <li>
          Each card should be separated by a space. For example: 2 4 6 J K A.
        </li>
        <li>Valid cards include: 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A.</li>
      </ul>
      <form @submit.prevent="onSubmit">
        <div class="form-input">
          <label class="form-label" for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="play.name"
            placeholder="Player Name"
            required
          />
        </div>
        <div class="form-input">
          <label class="form-label" for="hand">Hand</label>
          <input
            type="text"
            id="hand"
            name="hand"
            v-model="play.hand"
            placeholder="Player Hand"
            required
          />
        </div>
        <div class="form-button">
          <button class="submit-button" type="submit">Play</button>
        </div>
      </form>
    </div>
    <MessagesComponent
      :success-msg="success"
      :errors-msg="errors"
    ></MessagesComponent>
  </div>
  <div class="score" v-if="this.isWinner">
    <p>Player: {{ this.game.score.player }}</p>
    <p>Generated: {{ this.game.score.generated }}</p>
  </div>
  <WinnersListComponent :isWinner="isWinner" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WinnersListComponent from "@/components/WinnersListComponent.vue";
import MessagesComponent from "@/components/MessagesComponent.vue";
import api from "@/api";

export default defineComponent({
  name: "GameComponent",
  components: {
    WinnersListComponent,
    MessagesComponent,
  },
  data() {
    return {
      play: {
        name: null,
        hand: null,
      },
      game: {},
      isWinner: false,
      success: "",
      errors: {},
    };
  },
  methods: {
    onSubmit() {
      this.success = "";
      this.errors = {};
      api
        .post("play", this.play)
        .then((response) => {
          const game = response.data;
          this.game = game || {};
          this.isWinner = game.score.is_winner;
          this.success = "Game saved.";
        })
        .catch((responseError) => {
          const reponseErrorsList = responseError.response.data.errors;
          this.errors = reponseErrorsList;
        });
    },
  },
});
</script>

<style>
h1 {
  font-size: 5em;
}

.form {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  width: 50%;
  margin: 50px auto 50px auto;
  padding: 10px 0 20px 0;
}

.form > ul {
  font-size: 1em;
  text-align: left;
  width: 70%;
  margin: 10px auto 0 auto;
}

input {
  background-color: #fff;
  width: 60%;
  height: 2rem;
  border-radius: 5px;
  border-width: 0;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  margin-right: 50px;
}
input:focus {
  outline: none;
}

.form-input {
  margin-top: 15px;
}

.form-label {
  display: inline-block;
  width: 50px;
  text-align: right;
  margin-right: 20px;
  font-weight: bold;
}

.form-button {
  width: 100%;
  margin-top: 20px;
}

.form-button:after {
  border-top: 1px solid black;
}

.submit-button {
  font-size: 2em;
  width: 4em;
  height: 1.5em;
  background-color: dodgerblue;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}

.submit-button:hover {
  background-color: royalblue;
}
</style>
