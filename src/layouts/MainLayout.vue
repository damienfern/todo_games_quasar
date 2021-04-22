<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="add" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar color="white">
            <img src="https://findicons.com/files/icons/770/token_dark/256/games.png">
          </q-avatar>
          Todo Games
        </q-toolbar-title>
      </q-toolbar>

    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <search />
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import Search from '../components/Search'

export default {
  components: {
    Search
  },
  name: 'MainLayout',
  data () {
    return {
      left: false,
      right: false
    }
  }
}
</script>
