<template>
  <div ref="dropdownRef" class="relative w-full sm:w-1/2 md:w-1/3 xl:w-1/6">
    <div
      class="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 cursor-pointer truncate flex items-center justify-between"
      data-test-id="genre-filter"
      @click="toggleDropdown"
    >
      <span v-if="!selectedDisplayValue.length">{{ label }}</span>
      <span v-else>{{ selectedDisplayValue }}</span>
      <span class="flex gap-5 align-center">
        <button
          v-if="selectedDisplayValue.length"
          class="ml-2 text-gray-400 hover:text-white focus:outline-none text-xl cursor-pointer"
          @click.stop="clearSelection"
        >
          x
        </button>
        <span
          class="transition-transform duration-300 ease-in-out text-xl"
          :class="isOpen ? 'rotate-180' : 'rotate-0'"
        >
          <font-awesome-icon :icon="faChevronDown" class="text-xs" />
        </span>
      </span>
    </div>

    <div
      v-if="options.length > 0 && isOpen"
      class="absolute w-full bg-gray-800 text-white border border-gray-700 rounded-md mt-1 z-10 max-h-60 overflow-y-auto"
      data-test-id="genre-dropdown"
    >
      <div
        v-for="option in options"
        :key="option"
        class="p-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
        data-test-id="genre-option"
        @click="selectOption(option)"
      >
        <input
          v-if="multiSelect"
          type="checkbox"
          :checked="modelValue.includes(option)"
          class="accent-yellow-500"
        />
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const props = defineProps({
  modelValue: {
    type: [String, Array],
    required: true
  },
  options: {
    type: Array as () => string[],
    required: true
  },
  label: {
    type: String,
    default: "Select"
  },
  multiSelect: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const selectedDisplayValue = computed(() => {
  if (props.multiSelect && Array.isArray(props.modelValue)) {
    const maxItems = 2;
    if (props.modelValue.length > maxItems) {
      return `${props.modelValue.slice(0, maxItems).join(", ")}...`;
    }
    return props.modelValue.join(", ");
  }
  return props.modelValue || "";
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: string) => {
  if (props.multiSelect) {
    const updatedSelection = new Set(
      Array.isArray(props.modelValue) ? props.modelValue : []
    );

    if (updatedSelection.has(option)) {
      updatedSelection.delete(option);
    } else {
      updatedSelection.add(option);
    }
    emit("update:modelValue", Array.from(updatedSelection));
  } else {
    emit("update:modelValue", option);
    isOpen.value = false;
  }
};

const clearSelection = () => {
  emit("update:modelValue", props.multiSelect ? [] : "");
};

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
