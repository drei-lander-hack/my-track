<script setup lang="ts">
import { ref } from 'vue'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css' //Optional default CSS

defineProps<{
  options?: string[]
}>()
const emit = defineEmits(['input'])
const input = ref('')

function keypress(event: KeyboardEvent) {
  if (event.code === 'Enter') {
    doSearch()
  }
}

function selectItem(item: string) {
  emit('input', item)
  input.value = ''
}

function doSearch() {
  emit('input', input.value)
  input.value = ''
}
</script>

<template>
  <label>
    <input v-model="input" @keypress="keypress" v-if="!options" />
    <vue3-simple-typeahead
      v-else
      id="typeahead_id"
      placeholder="Gib' ein paar Zeichen ein..."
      :items="options"
      :minInputLength="1"
      @selectItem="selectItem"
    >
    </vue3-simple-typeahead>
    <button @click="doSearch">Ok</button>
  </label>
</template>

<style>
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
