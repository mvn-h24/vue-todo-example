<template>
  <div class="todo-card">
    <span>{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

interface ToDoListItemProps {
  title: string;
  description: string;
}
const props = defineProps<ToDoListItemProps>();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { title, description } = toRefs<ToDoListItemProps>(props);
</script>
