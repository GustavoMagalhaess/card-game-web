<template>
  <div class="success" v-if="successMsg !== ''">
    <p>{{ successMsg }}</p>
  </div>
  <div class="errors" v-if="Object.keys(errorsMsg).length > 0">
    <ul>
      <li v-for="error in errorsMsg" :key="error.id">{{ error }}</li>
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
    },
    errorsMsg: {
      type: Object,
    },
  },
});
</script>

<style scoped>
.success,
.errors {
  border: 1px solid transparent;
  width: 40%;
  margin: 0 auto 0 auto;
  border-radius: 5px;
}

.success {
  background-color: rgba(106, 241, 94, 0.4);
  color: green;
}

.errors {
  background-color: rgba(241, 94, 94, 0.4);
  color: red;
}

.errors > ul {
  list-style-type: none;
}
</style>
