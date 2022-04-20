<template>
  <div class="todo-list">
    <h3 class="text-sm">{{ title }}</h3>
    <div class="mt-2" v-if="$slots['cards-list']().length">
      <slot name="cards-list"></slot>
    </div>
    <div v-if="$slots['list-control-panel']().length" class="mt-2">
      <slot name="list-control-panel"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

interface TodoListProps {
  title?: string;
}
const props = withDefaults<Readonly<TodoListProps>, TodoListProps>(
  defineProps<TodoListProps>(),
  {
    title: "To do list",
  }
);
const { title } = toRefs<TodoListProps>(props);
</script>
