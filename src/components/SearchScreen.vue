<script setup lang="ts">
import { ref } from 'vue'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'; //Optional default CSS

defineProps<{
  step: {
    question: string,
    options?: string[]
  }
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
    <p>{{ step.question }}</p>
    <input v-model="input" @keypress="keypress" v-if="!step.options" />
    <vue3-simple-typeahead v-else
        id="typeahead_id"
        placeholder="Start writing..."
        :items="step.options"
        :minInputLength="1"

    >
    </vue3-simple-typeahead>
    <button @click="doSearch">Ok</button>
  </label>
</template>

<style scoped>
label {
  display: block;
  margin: 0 auto;
}

input {
  font-size: 20px;
  padding: 3px;
  width: 100%;
  display: block;
}

button {
  font-size: 20px;
  float: right;
  margin: 1rem 0;
  padding: 5px 20px;
}
</style>
