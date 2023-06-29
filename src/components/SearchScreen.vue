<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  question: string
}>()
const emit = defineEmits(["input"])
const input = ref('')

function keypress(event: KeyboardEvent) {
  if (event.code === "Enter") {
    doSearch()
  }
}

function doSearch() {
  emit("input", input.value)
  input.value = ""
}
</script>

<template>
  <label>
    <p>{{ question }}</p>
    <input v-model="input" @keypress="keypress" />

    <button @click="doSearch">Ok</button>
  </label>
</template>

<style scoped>
label {
  display: block;
  width: 40rem;
  max-width: 100%;
  margin: 0 auto;
}

input {
  font-size: 20px;
  padding: 3px;
  width: 40rem;
  max-width: 100%;
  display: block;
}

button {
  font-size: 20px;
  float: right;
  margin: 1rem 0;
  padding: 5px 20px;
}
</style>
