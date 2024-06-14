<template>
  <div class="card">
    <div class="card__img-wrapper">
      <img class="card__img" :src="character.image" :alt="character.name" />
    </div>
    <span class="card__name">
      {{ character.name ? character.name : 'Без имени' }}
    </span>
  </div>
</template>
<script setup>

const emit = defineEmits(['openModal'])


const props = defineProps({
  character: {
    required: true,
    type: Object,
    default: () => { }
  },
})
</script>

<style lang="scss" scoped>
.card {
  width: calc((100% / 4) - 6px);
  height: auto;
  border: 2px solid transparent;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  transition: 0.2s;

  &:hover {
    background-color: $accent;
    border: 2px solid transparent;
  }

  &__img {
    display: block;
    width: 100%;
    height: auto;

    object-fit: cover;

    &-wrapper {
      position: relative;
      width: 100%;
      height: auto;
      margin-right: 0;
    }
  }

  &__name {
    position: absolute;
    bottom: 0;
    padding: 8px;
    background-color: #3f3f3fb7;
    font-size: 24px;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    transition: 0.2s;
  }
}
</style>