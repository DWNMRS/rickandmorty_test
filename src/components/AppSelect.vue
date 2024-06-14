<template>
  <div class="select">
    <input class="select__input" type="text" placeholder=" " :class="classes" readonly v-model="inputValue" @click="toggleSelect"/>
    <span class="select__placeholder">{{ label }}</span>
    <div class="select__icon"></div>
    <div class="select__options">
      <AppSelectItem v-for="(status, i) in statuses" :key="i" :status="status"
        @click="handleItemSelect(i, status)" />
    </div>
  </div>
</template>

<script setup >
import { computed, ref } from 'vue';
import AppSelectItem from "@/components/AppSelectItem.vue"

const props = defineProps({
  statuses: {
    required: true,
    type: Array 
  },
  label: {
    required: true,
    type: String
  },
  identifier: {
    required: true,
    type: String
  }
})

const selectedItem = ref()
const isOpened = ref(false)
const inputValue = ref('')


const classes = computed(() => {
  return {
    'select__input--opened': isOpened.value === true,
  }
})
const emit = defineEmits(['getInputValue'])


const toggleSelect = () => {
  if (isOpened.value === false) {
    isOpened.value = true
  } else {
    closeItemOptions()
  }
}
function closeItemOptions() {
  isOpened.value = false
}

const handleItemSelect = (itemIndex, selectedOption) => {
  props.statuses.forEach((item) => {
    item.selected = false
  })
  props.statuses[itemIndex].selected = true
  selectedItem.value = selectedOption
  inputValue.value = selectedOption.option
  emit('getInputValue', selectedItem.value?.id, props.identifier)
  closeItemOptions()
}
</script>

<style scoped lang="scss">
.select {
  position: relative;
  width: 100%;
  height: 56px;
  border: 1px solid transparent;

  &__input {
    box-sizing: border-box;
    width: 100%;
    height: 56px;
    padding: 24px 18px 8px 0;
    color: $white;
    border: 1px solid transparent;
    border-bottom: 2px solid $text-secondary;
    background: none;
    outline: none;
    caret-color: $white;
    font-size: 16px;
    cursor: pointer;
    transition: border 0.3s;

    &:hover {
      border-bottom: 2px solid $accent;
    }

    &--opened {
      border-bottom: 2px solid $accent;

      ~.select__icon::after {
        transform: rotate(-45deg);
      }

      ~.select__icon::before {
        transform: rotate(45deg);
      }

      ~.select__options {
        max-height: 242px;
        z-index: 5;
        pointer-events: all;
      }
    }

    &--opened+.select__placeholder,
    &:not(:placeholder-shown)+.select__placeholder {
      top: 8px;
      font-weight: 600;
      transform: scale(0.8);
    }
  }

  &__icon {
    position: absolute;
    height: 7px;
    width: 13px;
    right: 0;
    top: 50%;

    &:after {
      position: absolute;
      content: " ";
      left: 0.5px;
      width: 8px;
      height: 2px;
      background: $accent;
      transition: all 0.3s ease 0s;
      transform: rotate(45deg);
    }

    &:before {
      position: absolute;
      content: " ";
      right: 0;
      width: 8px;
      height: 2px;
      background: $accent;
      transition: all 0.3s ease 0s;
      transform: rotate(-45deg);
    }
  }

  &__placeholder {
    position: absolute;
    color: $text-secondary;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    transition: top 0.3s linear, left 0.3s linear, font-size 0.3s linear, font-weight 0.3s linear, transform 0.3s linear;
    transform-origin: 0 0;
    z-index: 1;
    pointer-events: none;
  }

  &__options {
    position: absolute;
    box-sizing: border-box;
    border-radius: 0 0 4px 4px;
    top: calc(100% + 2px);
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.8s;
    z-index: 3;
    box-shadow: 0px 14px 25px rgba(0, 0, 0, 0.05);
    background-color: $background-secondary;
    pointer-events: none;

    &::-webkit-scrollbar {
      background-color: #3f3f3f;
      width: 12px;

      &-thumb {
        background-color: #6F6F6F;

        &:hover {
          background-color: #8F8F8F;
        }
      }
    }
  }
}
</style>