<template>
  <ToDoList
    v-for="(todoList, listIndex) in todoLists"
    :key="listIndex"
    :class="{ 'mt-4': listIndex }"
    :title="todoList.title"
  >
    <template #cards-list v-if="todoList.items.length">
      <ToDoListItem
        v-for="(todo, itemIndex) in todoList.items"
        :title="todo.title"
        :key="itemIndex"
        @title-edited="
          store.updateTodo(listIndex, itemIndex, { ...todo, title: $event })
        "
      />
      <ToDoListItem
        v-if="newListItem"
        :title="''"
        :edit="true"
        @title-edited="
          handleNewItemCreate(listIndex, {
            ...newListItem,
            title: $event,
          })
        "
        @title-edit-cancel="newListItem = null"
      />
    </template>
    <template #list-control-panel v-if="todoList.editable">
      <AddTodoItemButton @click="createListItem" />
    </template>
  </ToDoList>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserWorkspace } from "@app/store/useUserWorkspace";
import { ITodoListItem } from "@app/types/todo/ITodoListItem";
import ToDoList from "@app/components/ToDoList.vue";
import ToDoListItem from "@app/components/ToDoListItem.vue";
import AddTodoItemButton from "@app/components/AddTodoItemButton.vue";
import { ref } from "vue";

//app store
const store = useUserWorkspace();
const { todoLists } = storeToRefs(store);

//new list item
const newListItem = ref<Partial<ITodoListItem> | ITodoListItem | null>();
const createListItem = () => {
  newListItem.value = {};
};
const handleNewItemCreate = (listIndex: number, item: ITodoListItem) => {
  store.addTodo(listIndex, item);
  newListItem.value = null;
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
