<template>
  <ButtonComponent @click="addTodoList">Add todo list</ButtonComponent>
  <ListComponent
    v-for="(todoList, listIndex) in todoLists"
    :key="todoList.id"
    :class="{ 'mt-4': listIndex }"
    :title="todoList.title"
  >
    <template #cards-list v-if="todoList.items.length || newTodoItem">
      <ToDoCard
        v-for="item in todoList.items"
        :key="item.id"
        :title="item.title"
      />
      <ToDoCard
        v-if="newTodoItem && todoList.id === newTodoItem.todoList"
        :title="newTodoItem.title"
        :edit="true"
        @title-edited="handleNewItemCreate"
        @title-edit-cancel="workspace.cleanupNewItem"
      />
    </template>
    <template #list-control-panel v-if="todoList.editable">
      <ButtonComponent
        class="blue-btn w-full"
        @click="createListItem(todoList.id)"
        >Add a card</ButtonComponent
      >
    </template>
  </ListComponent>
  <ModalDialogComponent
    v-if="detailTodoElement"
    @dialog-close="cardDetailsClosed"
  >
    <template #dialog-content
      ><TodoDetailComponent :todo="detailTodoElement"
    /></template>
  </ModalDialogComponent>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import ListComponent from "@app/components/List/component.vue";
import ToDoCard from "@app/components/TodoCard/component.vue";
import ButtonComponent from "@app/components/Button/component.vue";
import { onMounted } from "vue";
import ModalDialogComponent from "@app/components/ModalDialog/component.vue";
import TodoDetailComponent from "@app/components/TodoDetail/component.vue";
import { useWorkspace } from "@app/store/Workspace/useWorkspace";

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
//card details
// const detailTodoElement = ref<null | ITodoListItem>(null);

// const cardDetailsCalled = (todo: ITodoListItem) => {
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
