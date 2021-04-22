import { Notify } from 'quasar'

export default {
  namespaced: true,
  state: () => ({
    listGames: []
  }),
  mutations: {
    addGame(state, game) {
      state.listGames.push(game)
      Notify.create({
        type: 'positive',
        message: 'Ajouté !'
      })
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