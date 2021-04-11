<template>
  <div class="game">
    <GameComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameComponent from "@/components/GameComponent.vue";

export default defineComponent({
  name: "GameView",
  components: {
    GameComponent,
  },
});
</script>
