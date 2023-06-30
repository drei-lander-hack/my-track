<script setup lang="ts">
import { ref } from 'vue'
import logo from './assets/logo.jpeg'
import { DbBrand, DbFooter, DbHeader, DbPage } from '@db-ui/v-elements/dist/components'

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
const reserved = ref<RouteType>()

const currentLine = ref(0)

type State = 'asking' | 'calculating' | 'selecting' | 'complete'
type RouteType = 'shortest' | 'cheapest' | 'fastest'

const state = ref<State>('asking')

function answer(answer: string) {
  answers.value.push(answer)
  currentLine.value++
  if (currentLine.value === steps.length) {
    state.value = 'calculating'
    setTimeout(() => (state.value = 'selecting'), 2000)
  }
}

function selectOption(type: RouteType) {
  reserved.value = type
  state.value = 'complete'
}

function startOver() {
  currentLine.value = 0
  answers.value = []
  state.value = 'asking'
}
</script>

<template>
  <DbPage>
    <DbHeader>
      <DbBrand :src="logo" @click="startOver">Meine Trasse, Deine Trasse</DbBrand>
    </DbHeader>

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
          <div class="cheapest">
            <p><b>Kosten: 693€</b></p>
            <p>Fahrdauer: 5:21</p>
            <p>Energieverbrauch: 45MWh</p>

            <button @click="selectOption('cheapest')">Reservieren</button>
          </div>

          <div class="fastest">
            <p>Kosten: 1200€</p>
            <p><b>Fahrdauer: 4:50</b></p>
            <p>Energieverbrauch: 56MWh</p>

            <button @click="selectOption('fastest')">Reservieren</button>
          </div>

          <div class="shortest">
            <p>Kosten: 807€</p>
            <p>Fahrdauer: 6:55</p>
            <p><b>Energieverbrauch: 39MWh</b></p>

            <button @click="selectOption('shortest')">Reservieren</button>
          </div>
        </div>
      </div>

      <div v-if="state === 'complete'">Fertig</div>
    </div>
    <DbFooter copyright border></DbFooter>
  </DbPage>
</template>

<style scoped>
img {
  max-width: 100%;
}

.legend {
  display: flex;
  justify-content: space-evenly;
}

.legend div {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
}

.legend p,
.legend b {
  font-size: 15px;
}

.shortest {
  background-color: violet;
}
.fastest {
  background-color: aqua;
}
.cheapest {
  background-color: red;
}

.legend button {
  margin: 0.5rem 0;
  padding: 0 10px;
  font-size: 18px;
}
</style>
