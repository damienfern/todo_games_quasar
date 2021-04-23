import { Notify } from 'quasar'

export default {
  namespaced: true,
  state: () => ({
    listGames: []
  }),
  mutations: {
    addGame(state, game) {
      const notif = {}
      if (state.listGames.filter(item => item.id === game.id).length > 0) {
        notif.type = 'warning'
        notif.message = 'Ce jeu existe déjà dans votre liste !'
      } else {
        state.listGames.push(game)
        notif.type = 'positive'
        notif.message = 'Ajouté !'
      }
      Notify.create(notif)
    },
    deleteGame(state, game) {
      const updatedList = state.listGames.filter(item => item.id !== game.id)
      state.listGames = updatedList
    },
    changeGameStatus(state, game) {
      const element = state.listGames.filter(item => item.id === game.id)[0]
      element.done = !element.done
    }
  },
  actions: {
    addGameToList (context, gameInfo) {
      context.commit('addGame', gameInfo)
    },
    deleteGameFromList(context, game) {
      context.commit('deleteGame', game)
    },
    changeGameStatus(context, game) {
      context.commit('changeGameStatus', game)
    }
  }
}