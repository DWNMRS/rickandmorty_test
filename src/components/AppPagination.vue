<template>
  <div class="pagination">
    <div class="pagination__buttons">
      <button class="pagination__button" :disabled="currentPage === 1" @click="changePage('first')">«
      </button>
      <button class="pagination__button" :disabled="currentPage === 1" @click="changePage('prev')">‹
      </button>
      <span class="pagination__info">{{ currentPage }} из {{ pages }}</span>
      <button class="pagination__button" :disabled="currentPage === pages" @click="changePage('next')">›
      </button>
      <button class="pagination__button" :disabled="currentPage === pages" @click="changePage('last')">»
      </button>
    </div>
    <AppInput label="Перейти на страницу" type="number" @change="handlePageInput"  />
  </div>
</template>


<script setup>
import AppInput from "@/components/AppInput.vue"

const props = defineProps({
  pages: {
    required: true,
    type: Number
  },
  currentPage: {
    required: true,
    type: Number
  }
})

const emit = defineEmits(['getPage'])

const handlePageInput = (event) => {
  const page = parseInt(event.target.value, 10);
  if (!isNaN(page) && page >= 1 && page <= props.pages) {
    emit('getPage', page);
  } else {
    event.target.value = '';
  }
};

const changePage = (action) => {
  let newPage;
  switch (action) {
    case 'first':
      newPage = 1;
      break;
    case 'prev':
      newPage = props.currentPage > 1 ? props.currentPage - 1 : 1;
      break;
    case 'next':
      newPage = props.currentPage < props.pages ? props.currentPage + 1 : props.pages;
      break;
    case 'last':
      newPage = props.pages;
      break;
  }
  if (newPage !== undefined) {
    emit('getPage', newPage);
  }
};


</script>

<style lang="scss" scoped>
.pagination {
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content:space-between;
  align-items: center;
  gap: 16px;
  background-color: $background-secondary;
  color: $white;

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;

  }

  &__button {
    width: 42px;
    height: 42px;
    color: $white;
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;
    font-size: 32px;
    transition: 0.2s;
    border: 1px solid $transparent;
    border-radius: 4px;

    &:hover {
      border: 1px solid $accent;
    }

  }

  &__info {
    font-size: 24px;
    margin: 0 16px;
  }
}
</style>