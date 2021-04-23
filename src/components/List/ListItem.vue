<template>
  <div>
    <q-btn icon="save" @click="saveList()"> Sauvegarder en local </q-btn>
    <item v-for="item in items" :key="item.id" :game="item" />
  </div>
</template>

<script>
import Item from "./Item.vue"
import { mapState, mapGetters } from 'vuex'

export default {
  components: { Item },
  computed: {
    ...mapState({
      items: state => state.todo.listGames
    }),
    ...mapGetters({
      itemsToSave: 'todo/lightListGames'
    })
  },
  methods: {
    saveList() {
      localStorage.setItem('listGames', JSON.stringify(this.itemsToSave))
    }
  }
}
</script>

<style>

</style>