<template>
  <form class="form" @submit.prevent="setQueryString(queryString)">
    <AppInput label="Имя" type="text" identifier="name" @getInputValue="setValueFormData" />
    <AppSelect label="Статус" :statuses="statuses" identifier="status" @getInputValue="setValueFormData" />
    <button class="form__button">Поиск</button>
  </form>
</template>

<script setup>

import { ref, computed } from 'vue';

import AppInput from "@/components/AppInput.vue"
import AppSelect from "@/components/AppSelect.vue"


const props = defineProps({
  statuses: {
    required: true,
    type: Object
  },
})
const emit = defineEmits(['getQuerySrting'])

const formData = ref({
  name: '',
  status: '',
})

const queryString = computed(() => {
  let queryString = ''
  for (const key in formData.value) {
    if (formData.value[key]) {
      queryString += `${key}=${formData.value[key]}&`
    }
  }
  queryString = queryString.slice(0, -1)
  return queryString
})

function setValueFormData(inputValue, field) {
  formData.value[field] = inputValue
}

function setQueryString(queryString) {
  emit('getQuerySrting', queryString)
}

</script>

<style lang="scss" scoped>
.form {
  background-color: $background-secondary;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: 280px;
  border-radius: 4px;

  &__button {
    background-color: $accent;
    color: #FFFFFF;
    padding: 16px;

  }
}
</style>