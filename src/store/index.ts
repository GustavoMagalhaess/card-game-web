import { createStore } from "vuex";
import api from "@/api";

export default createStore({
  state: {
    winners: [],
    play: {
      name: "",
      hand: "",
    },
    game: {},
    isWinner: false,
    success: "",
    errors: [],
  },
  mutations: {
    setWinners(state, payload) {
      state.winners = payload;
    },
    setGame(state, payload) {
      state.game = payload;
      state.isWinner = payload.score.is_winner;
      state.success = "Game Saved.";
      state.play.name = "";
      state.play.hand = "";
    },
    setErrors(state, payload) {
      state.errors = payload;
    },
    reset(state) {
      state.isWinner = false;
      state.success = "";
      state.errors = [];
    },
  },
  actions: {
    async getWinners({ commit }) {
      const response = await api.getAll("winners");
      commit("setWinners", response.data || []);
    },
    async play({ commit, state }) {
      commit("reset");
      await api
        .post("play", state.play)
        .then((response) => commit("setGame", response.data || {}))
        .catch((error) => commit("setErrors", error.response.data.errors));
    },
  },
  modules: {},
});
