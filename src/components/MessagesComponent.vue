<template>
  <div
    class="alert alert-success alert-dismissible fade show"
    role="alert"
    v-if="successMsg !== ''"
  >
    {{ successMsg }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div
    class="alert alert-danger alert-dismissible fade show"
    role="alert"
    v-if="errorsMsg.length > 0"
  >
    <ul>
      <li v-for="(error, index) in errorsMsg" :key="index">{{ error }}</li>
    </ul>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MessagesComponent",
  props: {
    successMsg: {
      type: String,
    },
    errorsMsg: {
      type: Object,
    },
  }
});
</script>

<style scoped></style>
