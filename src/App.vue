<template>
  <ListComponent
    v-for="(todoList, listIndex) in todoLists"
    :key="listIndex"
    :class="{ 'mt-4': listIndex }"
    :title="todoList.title"
  >
    <template #cards-list v-if="todoList.items.length">
      <ToDoCard
        v-for="(todo, itemIndex) in todoList.items"
        :title="todo.title"
        :key="itemIndex"
        @title-edited="
          store.updateTodo(listIndex, itemIndex, { ...todo, title: $event })
        "
      />
      <ToDoCard
        v-if="newListItem && listIndex === newListItem.listId"
        :title="newListItem.title"
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
      <ButtonComponent @click="createListItem(listIndex)" />
    </template>
  </ListComponent>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserWorkspace } from "@app/store/useUserWorkspace";
import { ITodoListItem } from "@app/types/todo/ITodoListItem";
import ListComponent from "@app/components/List/component.vue";
import ToDoCard from "@app/components/TodoCard/component.vue";
import ButtonComponent from "@app/components/Button/component.vue";
import { ref } from "vue";

//app store
const store = useUserWorkspace();
const { todoLists } = storeToRefs(store);

//new list item
interface newTodoListItem extends ITodoListItem {
  listId: number;
}
const newListItem = ref<newTodoListItem | null>();
const createListItem = (listId: number) => {
  newListItem.value = {
    title: "",
    description: "",
    listId,
  };
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
