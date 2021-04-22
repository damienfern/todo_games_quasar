<template>
  <div>
    <q-input
      filled
      v-model="addGameTextInput"
      label="Ajouter un jeu"
      hint="Nom du jeu"
      @keydown="searchGame()"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />
    
    <q-card
      class="my-card"
      v-for="oneGame in searchResults"
      :key="oneGame.id"
      @click="addGame(oneGame)"
    >
      <q-card-section>
        <div class="text-h6">{{ oneGame.name }}</div>
      </q-card-section>
      <q-card-actions>
        <q-btn @click="addGame(oneGame)" flat>A faire</q-btn>
        <q-btn @click="addGame(oneGame)" flat>Fait</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import igdbApi from "../api/igdb";

let timeout = null;
console.log(process.env.API_URL);
export default {
  data() {
    return {
      addGameTextInput: "",
      searchResults: []
    };
  },
  methods: {
    searchGame() {
      const that = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (this.addGameTextInput.length > 2) {
          console.log("SEARCHING");
          igdbApi.getGamesByName(this.addGameTextInput).then(response => {
            that.searchResults = response.data;
          });
        }
      }, 800);
    },
    addGame(oneGame) {
      this.$store.dispatch("todo/addGameToList", oneGame);
      this.addGameTextInput = "";
      this.searchResults = [];
    }
  }
};
</script>

<style></style>
