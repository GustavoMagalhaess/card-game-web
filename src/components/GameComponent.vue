<template>
  <div class="container">
    <h1>Card Game</h1>
    <div class="row">
      <div class="col-sm-12">
        <form @submit.prevent="onSubmit">
          <div class="row">
            <div class="col-sm-12">
              <ul>
                <li>Name is required.</li>
                <li>Enter a hand of cards.</li>
                <li>
                  Each card should be separated by a space. For example: 2 4 6 J
                  K A.
                </li>
                <li>
                  Valid cards include: 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A.
                </li>
              </ul>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label" for="name">Name</label>
            <div class="col-sm-10">
              <input
                class="form-control"
                type="text"
                id="name"
                name="name"
                v-model="play.name"
                placeholder="Player Name"
                required
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label" for="hand">Hand</label>
            <div class="col-sm-10">
              <input
                class="form-control"
                type="text"
                id="hand"
                name="hand"
                v-model="play.hand"
                placeholder="Player Hand"
                required
              />
            </div>
          </div>
          <button class="btn btn-primary btn-block" type="submit">Play</button>
        </form>
      </div>
    </div>
    <MessagesComponent
      :success-msg="success"
      :errors-msg="errors"
    ></MessagesComponent>
  </div>
  <div class="score" v-if="isWinner">
    <p>Player: {{ game.score.player }}</p>
    <p>Generated: {{ game.score.generated }}</p>
  </div>
  <WinnersListComponent :isWinner="isWinner" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WinnersListComponent from "@/components/WinnersListComponent.vue";
import MessagesComponent from "@/components/MessagesComponent.vue";
//import api from "@/api";
import store from "@/store";

export default defineComponent({
  store,
  name: "GameComponent",
  components: {
    WinnersListComponent,
    MessagesComponent,
  },
  methods: {
    onSubmit() {
      store.dispatch("play", this.play);
    },
  },
  computed: {
    success() {
      return store.state.success;
    },
    errors() {
      return store.state.errors;
    },
    game() {
      return store.state.game;
    },
    isWinner() {
      return store.state.isWinner;
    },
    play() {
      return store.state.play;
    },
  },
});
</script>

<style>
h1 {
  margin-top: 20px;
  margin-bottom: 50px;
}

form {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  margin-bottom: 50px;
  padding: 20px;
}

ul {
  text-align: left;
  width: 70%;
  margin: 0 auto 30px auto;
}
</style>
