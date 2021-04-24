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
    errors: {},
  },
  mutations: {
    setWinners(state, payload) {
      state.winners = payload;
    },
    setGame(state, payload) {
      state.game = payload;
      state.isWinner = payload.score.is_winner;
      state.success = "Game Saved.";
    },
    setErrors(state, payload) {
      state.errors = payload;
    },
  },
  actions: {
    async getWinners({ commit }) {
      const response = await api.getAll("winners");
      commit("setWinners", response.data || []);
    },
    async play({ commit }, play) {
      await api
        .post("play", play)
        .then((response) => commit("setGame", response.data || {}))
        .catch((error) => commit("setErrors", error.response.data.errors));
    },
  },
  modules: {},
});
