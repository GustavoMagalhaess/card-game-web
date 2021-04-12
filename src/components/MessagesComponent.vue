<template>
  <div calss="success" v-if="success">
    <p>{{ success }}</p>
  </div>
  <div class="errors">
    <ul>
      <li v-for="error in errorsList" :key="error.id">{{ error }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MessagesComponent",
  props: {
    successMsg: {
      type: String,
      required: false,
    },
    errorsMsg: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      successMessage: this.successMsg || "",
      errorsList: this.errorsMsg || [],
    };
  },
});
</script>
