<script setup lang="ts">
import { ref } from 'vue'
import InputField from './components/InputField.vue'
import tfz from './assets/tfz.json'

const steps = [
  { question: 'Wohin soll es gehen?', answer: 'Du fährst nach' },
  { question: 'Wo startet der Zug denn?', answer: 'Du startest in' },
  {
    question: "Prima, dann sag' mir bitte noch, mit welchem Triebfahrzeug du unterwegs sein wirst.",
    options: tfz,
    answer: 'Du fährst mit einer'
  },
  {
    question: 'Oh, dann brauche ich noch die Länge des Zugs in Metern',
    answer: 'Der Zug hat eine Länge von'
  }
]

const answers = ref<string[]>([])

const currentLine = ref(0)

function answer(answer: string) {
  answers.value.push(answer)
  currentLine.value++
}

function startOver() {
  currentLine.value = 0
  answers.value = []
}
</script>

<template>
  <header>
    <a @click="startOver">
      <img alt="Vue logo" class="logo" src="./assets/logo.png" width="125" height="125" />
    </a>
  </header>

  <div class="wrapper">
    <p v-for="(answer, index) in answers" :key="index">
      {{ steps[index].answer }}
      {{ answer }}.
    </p>

    <div v-if="currentLine < steps.length">
      <p>{{ steps[currentLine].question }}</p>
      <InputField :options="steps[currentLine].options" @input="(str) => answer(str)" />
    </div>

    <div v-else>
      <p>Ich habe nun ein paar Routenvorschläge für dich:</p>
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
  margin: 0;
}

img {
  max-width: 100%;
}
</style>
