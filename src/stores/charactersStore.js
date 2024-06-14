import { defineStore } from 'pinia'
import axios from 'axios'

const url = `https://rickandmortyapi.com/api/character`

export const useCharactersStore = defineStore('charactersStore', {
  state: () => ({
    statuses: [
      {
        id: 'Any',
        option: 'Любой',
        selected: false,
      },
      {
        id: 'Unknown',
        option: 'Неизвестен',
        selected: false,
      },
      {
        id: 'Alive',
        option: 'Жив',
        selected: false,
      },
      {
        id: 'Dead',
        option: 'Мертв',
        selected: false,
      },
    ],
    characters: [],
    pages: 0,
  }),
  actions: {
    async getCharacters(queryString) {
      this.status = 'loading'
      try {
        const { data } = await axios.get(
          `${url}?${queryString ? queryString : ''}`
        )
        this.characters = data.results
        this.pages = data.info.pages
      } catch (error) {
        console.error('Error fetching filters:', error)
      }
    },
  },
})