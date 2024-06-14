<template>
  <div :class="['pagination__item', { 'pagination__item--selected': pages.selected }]">
  </div>
</template>

<script setup>

const props = defineProps({
  pages: {
    required: true,
    type: Object
  }
})

</script>

<style lang="scss" scoped>
.pagination {
  &__item {
    width: 10px;
    height: 10px;
    background-color: $white;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      border: 1px solid $accent;
    }

    &--selected {
      background-color: $accent;
    }
  }
}
</style>