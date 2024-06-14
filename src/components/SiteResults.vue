<template>
  <div class="results">
    <AppPagination :pages="pages" :currentPage="currentPage" @getPage="getPage"  />
    <div class="results__container">
      <SiteCard v-for="(character) of characters" :key="character.id" :character="character" />
    </div>
    <AppPagination :pages="pages" :currentPage="currentPage" @getPage="getPage"  />
  </div>
</template>

<script setup>
import SiteCard from "@/components/SiteCard.vue"
import AppPagination from "@/components/AppPagination.vue"

const props = defineProps({
  characters: {
    required: true,
    type: Array
  },
  pages: {
    required: true,
    type: Number
  },
  currentPage: {
    required:true,
    type: Number
  }
})

const emit = defineEmits(['getPage'])

function getPage(selectedPage) {
  emit('getPage', selectedPage)
}
</script>

<style lang="scss" scoped>
.results {
  width: 100%;
  height: 100%;
  color: #FFFFFF;
  overflow: auto;
  padding-right: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 14px;

    &-thumb {
      width: 4px;
      border-radius: 2px;
      background-color: #FFFFFF14;
    }
  }
}
</style>