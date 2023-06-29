<script setup lang="ts">
import { ref } from 'vue'
import SearchScreen from './components/SearchScreen.vue'

const questions = [
  'Wohin soll es gehen?',
  'Danke für deine Anfrage! Wo startet der Zug denn?',
  "Prima, dann sag' mir bitte noch, mit welchem Triebfahrzeug du unterwegs sein wirst."
]

const labels = ['Du fährst nach ', 'Du startest in ', 'Du fährst mit ']

const answers = ref<string[]>([])

const currentLine = ref(0)

function answer(answer: string) {
  answers.value.push(answer)
  currentLine.value++
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.png" width="125" height="125" />
  </header>

  <div class="wrapper">
    <div v-if="currentLine < questions.length">
      <SearchScreen :question="questions[currentLine]" @input="(str) => answer(str)" />

      <p v-for="(answer, index) in answers" :key="index">
        {{ labels[index] }}
        {{ answer }}
      </p>
    </div>

    <div v-else>
      <p>Ok, ich habe nun ein paar Routenvorschläge für dich:</p>
      <img src="/src/assets/routen.png" />
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

img {
  max-width: 100%;
}
</style>
