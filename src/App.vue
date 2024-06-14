<template>
  <div class="main">
    <SiteForm :statuses="charactersStore.statuses" @getQuerySrting="setQueryString"  />
    <SiteResults :queryString="queryString" :characters="charactersStore.characters" :pages="charactersStore.pages" :currentPage="currentPage"
      @getPage="setPage" />
  </div>
</template>

<script setup>
import SiteForm from "@/components/SiteForm.vue"
import SiteResults from "@/components/SiteResults.vue"

import { onMounted, ref } from 'vue';

import { useCharactersStore,  } from "@/stores/charactersStore.js"
const charactersStore = useCharactersStore()
const queryString = ref('')
const currentPage = ref(1)

onMounted(() => {
  charactersStore.getCharacters()
})

function setPage(selectedPage) {
  currentPage.value = selectedPage
  const updatedQueryString = queryString.value.replace(/&page=\d+/g, '') + `&page=${currentPage.value}`
  charactersStore.getCharacters(updatedQueryString, currentPage.value)
}
function setQueryString(query) {
  currentPage.value = 1
  queryString.value = (query + `&page=${currentPage.value}`)
  charactersStore.getCharacters(queryString.value, currentPage.value)
}

</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  width: 100%;
  background-color: $background;
  padding: 8px;
  display: flex;
  gap: 8px;
  margin-left: auto;
  margin-right: auto;
}
</style>
