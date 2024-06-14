<template>
  <div :class="['select__item', { 'select__item--selected': status.selected }]">
    {{ status.option }}
  </div>
</template>

<script setup>

const props = defineProps({
  status: {
    required: true,
    type: Object
  }
})

</script>

<style scoped lang='scss'>
.select {
  &__item {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    background-color: #3f3f3f;
    width: 100%;
    color: $text;
    height: 56px;
    padding-left: 12px;
    cursor: pointer;

    &:hover {
      background-color: #6F6F6F;
    }

    &--selected {
      background-color: #8F8F8F;

      &:hover {
        background-color: #8F8F8F;
      }
    }
  }
}
</style>