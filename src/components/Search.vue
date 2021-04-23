<template>
  <div>
    <q-input
      filled
      ref="addGameTextInput"
      v-model="addGameTextInput"
      label="Ajouter un jeu"
      @keydown="searchGame()"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />
    <q-separator />
    <q-card
      class="my-card"
      v-for="oneGame in searchResults"
      :key="oneGame.id"
    >
      <q-card-section>
        <div class="text-h6">{{ oneGame.name }}</div>
      </q-card-section>
      <q-card-actions>
        <q-btn @click="addGame(oneGame, false)" icon="add" flat>A faire</q-btn>
        <q-btn @click="addGame(oneGame, true)" icon="done" flat>Fait</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import igdbApi from "../api/igdb";

let timeout = null;

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
    addGame(oneGame, isDone) {
      const game = { ...oneGame, done: isDone };
      this.$store.dispatch("todo/addGameToList", game);
      this.addGameTextInput = "";
      this.searchResults = [];
      this.$refs.addGameTextInput.resetValidation();
    }
  }
};
</script>

<style></style>
