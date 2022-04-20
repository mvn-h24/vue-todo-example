<template>
  <ToDoList
    v-for="(todoList, index) in ListOfTodoLists"
    :key="index"
    :title="todoList.title"
    :editable="todoList.editable"
  >
    <template #cards-list v-if="todoList.items.length">
      <ToDoListItem
        v-for="(todo, index) in todoList.items"
        :title="todo.title"
        :description="todo.description"
        :key="index"
      />
    </template>
    <template #list-control-panel v-if="todoList.editable">
      <AddTodoItemButton />
    </template>
  </ToDoList>
</template>

<script lang="ts">
import ToDoList from "@app/components/ToDoList.vue";
import ToDoListItem from "@app/components/ToDoListItem.vue";
import { defineComponent, ref } from "vue";
import AddTodoItemButton from "@app/components/AddTodoItemButton.vue";
import { ITodoList } from "@app/types/ITodoList";
import { EditableTodoListMock } from "./app-data-mock";

export default defineComponent({
  setup() {
    const ListOfTodoLists = ref<Array<ITodoList>>([EditableTodoListMock]);
    return {
      ListOfTodoLists,
    };
  },
  components: {
    ToDoListItem,
    ToDoList,
    AddTodoItemButton,
  },
});
</script>

<style>
/*noinspection ALL*/
html,
body,
#app {
  width: 100%;
  min-height: 100vh;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
