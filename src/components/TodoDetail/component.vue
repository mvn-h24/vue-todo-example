<template>
  <div>
    <h2>{{ todo.title }}</h2>
    <span>{{ todo.description }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ITodoItem } from "@app/types/todo/ITodoItem";

export default defineComponent({
  name: "TodoDetailComponent",
  props: {
    todo: Object as PropType<ITodoItem>,
  },
});
</script>
