<template>
  <ButtonComponent class="green-btn mb-5" @click="addTodoList"
    >Add todo list</ButtonComponent
  >
  <ListComponent
    v-for="(todoList, listIndex) in todoLists"
    :key="todoList.id"
    :class="{ 'mt-4': listIndex }"
    :title="todoList.title"
  >
    <template
      #cards-list
      v-if="workspace.getListItems(todoList.id).length || newTodoItem"
    >
      <ToDoCard
        v-for="todo in workspace.getListItems(todoList.id)"
        :key="todo.id"
        @title-edited="handleItemTitleEdit(todo, $event)"
        @delete-call="workspace.deleteItemById(todo.id)"
        :title="todo.title"
      >
        {{ todo }}
      </ToDoCard>
      <ToDoCard
        v-if="newTodoItem && todoList.id === newTodoItem.listId"
        :title="newTodoItem.title"
        :edit="true"
        @title-edited="handleNewItemCreate"
        @title-edit-cancel="handleNewItemCreateCancel"
      />
    </template>
    <template #list-control-panel v-if="todoList.editable">
      <ButtonComponent
        class="blue-btn w-full"
        :disabled="newTodoItem && todoList.id === newTodoItem.listId"
        @click="createListItem(todoList.id)"
        >Add a card</ButtonComponent
      >
    </template>
  </ListComponent>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import ListComponent from "@app/components/List/component.vue";
import ToDoCard from "@app/components/TodoCard/component.vue";
import ButtonComponent from "@app/components/Button/component.vue";
import { onMounted } from "vue";
import { useWorkspace } from "@app/store/Workspace/useWorkspace";
import { ITodoItem } from "@app/types/todo/ITodoItem";

//app workspace
const workspace = useWorkspace();
const { todoLists, newTodoItem } = storeToRefs(workspace);
onMounted(() => workspace.load());
const createListItem = (id: number) => {
  workspace.createListTodo(id);
  return workspace.load();
};
const addTodoList = () => workspace.createNewTodoList();
const handleNewItemCreate = (data: string) => {
  if (newTodoItem.value) {
    newTodoItem.value.title = data;
    return workspace.saveNewItem().then(() => workspace.load(true));
  }
};
const handleNewItemCreateCancel = () => workspace.load(true);
const handleItemTitleEdit = (item: ITodoItem, title: string) =>
  workspace.itemUpdate({ ...item, title });
//card details
// const detailTodoElement = ref<null | ITodoItem>(null);

// const cardDetailsCalled = (todo: ITodoItem) => {
//   detailTodoElement.value = todo;
// };
// const cardDetailsClosed = () => {
//   detailTodoElement.value = null;
// };
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
