<template>
  <div class="input">
    <input class="input__field" :type="type" placeholder=" " @change="updateInputValue"
      v-model="inputValue">
    <span class="input__placeholder">{{ props.label }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('')

const props = defineProps({
  label: {
    required: true,
    type: String
  },

  type: {
    required: true,
    type: String
  },

  identifier: {
    required: false,
    type: String
  },
})

const emit = defineEmits(['getInputValue'])

function updateInputValue() {
  if (props.maxLength && props.maxValue && props.minValue) {
    let newValue = +inputValue.value;

    if (props.minValue && newValue < props.minValue) {
      newValue = props.minValue;
    } else if (props.maxValue && newValue > props.maxValue) {
      newValue = props.maxValue;
    }
    inputValue.value = newValue.toString();
  }

  emit('getInputValue', inputValue, props.identifier);
}
</script>

<style lang="scss" scoped>
.input {
  font-style: normal;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 56px;
  background-color: $background;
  z-index: 0;
  border: 1px solid transparent;

  &__field {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 24px 12px 8px;
    border: 1px solid transparent;
    background: none;
    outline: none;
    caret-color: $white;
    color: $white;
    font-size: 16px;
    z-index: 1;
    cursor: pointer;
    transition: border 0.3s;

    &:hover,
    &:focus {
      border: 1px solid $accent;
    }

    &:focus+.input__placeholder,
    &:not(:placeholder-shown)+.input__placeholder {
      top: 8px;
      font-weight: 600;
      transform: scale(0.8);
    }
  }

  &__placeholder {
    position: absolute;
    color: $text-secondary;
    top: 50%;
    transform: translateY(-50%);
    left: 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    transition: top 0.3s linear, left 0.3s linear, font-size 0.3s linear, font-weight 0.3s linear, transform 0.3s linear;
    z-index: 1;
    transform-origin: 0 0;
    pointer-events: none;
  }

}
</style>