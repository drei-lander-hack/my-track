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

type State = 'asking' | 'calculating' | 'selecting' | 'complete'

const state = ref<State>('asking')

function answer(answer: string) {
  answers.value.push(answer)
  currentLine.value++
  if (currentLine.value === steps.length) {
    state.value = 'calculating'
    setTimeout(() => (state.value = 'selecting'), 2000)
  }
}

function startOver() {
  currentLine.value = 0
  answers.value = []
  state.value = 'asking'
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

    <div v-if="state === 'asking'">
      <p>{{ steps[currentLine].question }}</p>
      <InputField :options="steps[currentLine].options" @input="(str) => answer(str)" />
    </div>

    <div v-if="state === 'calculating'">
      <p>Ich suche passende Trassen...</p>
      <img src="./assets/spinner.gif" />
    </div>

    <div v-if="state === 'selecting'">
      <p>Ich habe nun ein paar Routenvorschläge für dich:</p>
      <img src="/src/assets/routen.png" />

      <div class="legend">
        <div class="shortest">Kürzeste Strecke <button>Reservieren</button></div>
        <div class="cheapest">Günstigste Strecke <button>Reservieren</button></div>
        <div class="fastest">Schnellste Strecke <button>Reservieren</button></div>
      </div>
    </div>

    <div v-if="state === 'complete'">
      
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

.legend div::before {
  display: inline-block;
  content: '';
  height: 4px;
  width: 50px;
  margin: -0.5rem 0.5rem 0 0;
}

.shortest::before {
  background-color: violet;
}
.fastest::before {
  background-color: aqua;
}
.cheapest::before {
  background-color: red;
}

.legend button {
  margin: 0;
  padding: 0 10px;
  font-size: 18px;
}
</style>
