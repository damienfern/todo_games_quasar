<template>
  <q-card>
    <q-img
      contain
      style="height: 90px;"
      :src="cover.url"
    />
    <q-card-section>
      <div class="text-h6">{{ game.name }}</div>
      <q-chip
        style="margin-left: 5px;"
        v-show="game.done"
        color="green"
        text-color="white"
      >Terminé
      </q-chip>
      </q-card-section>
      <q-card-section>
        <p>{{ game.storyline }}</p>
        Plus de détails : <a :href="game.url">{{ game.url }}</a>
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="red lighten-2"
          text
          icon="delete"
          @click="deleteMeFromList(game)"
        >
          Supprimer
        </q-btn>
        <q-btn
          color="deep-purple lighten-2"
          text
          :icon="!game.done ? 'check': 'close'"
          @click="changeGameStatus(game)"
        >
          <span v-if="!game.done"> Marquer comme terminé </span>
          <span v-else> Annuler </span>
        </q-btn>
      </q-card-actions>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import igdbApi from '../../api/igdb'

export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cover: {
        url: null
      }
    }
  },
  created() {
    const that = this
    igdbApi.getUrlCoverByCoverID(this.game.cover)
        .then((response) => {
          that.cover = {
            url: 'https://' + response.data[0].url
          }
        })
  },
  methods: {
    ...mapActions({
      // `mapActions` also supports payloads:
      deleteMeFromList: 'todo/deleteGameFromList',
      changeGameStatus: 'todo/changeGameStatus'
    }),
  }
}
</script>

<style>

</style>