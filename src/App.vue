<template>
  <ToDoList
    v-for="(todoList, listIndex) in todoLists"
    :key="listIndex"
    :title="todoList.title"
    :editable="todoList.editable"
  >
    <template #cards-list v-if="todoList.items.length">
      <ToDoListItem
        v-for="(todo, itemIndex) in todoList.items"
        :title="todo.title"
        :description="todo.description"
        :key="itemIndex"
        @title-edited="
          handleTodoItemTitleEdit(listIndex, itemIndex, todo, $event)
        "
      />
    </template>
    <template #list-control-panel v-if="todoList.editable">
      <AddTodoItemButton />
    </template>
  </ToDoList>
</template>

<script setup lang="ts">
import ToDoList from "@app/components/ToDoList.vue";
import ToDoListItem from "@app/components/ToDoListItem.vue";
import AddTodoItemButton from "@app/components/AddTodoItemButton.vue";
import { useUserWorkspace } from "@app/store/useUserWorkspace";
import { storeToRefs } from "pinia";
import { ITodoListItem } from "@app/types/todo/ITodoListItem";

const store = useUserWorkspace();
const { todoLists } = storeToRefs(store);
const handleTodoItemTitleEdit = function (
  listId: number,
  itemID: number,
  todo: ITodoListItem,
  title: string
) {
  store.updateTodo(listId, itemID, { ...todo, title });
};
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
