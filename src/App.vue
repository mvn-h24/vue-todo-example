<template>
  <ButtonComponent class="green-btn" @click="addTodoList"
    >Add todo list</ButtonComponent
  >
  <div class="grid items-start grid-flow-col gap-5 auto-cols-max">
    <ListComponent
      v-for="todoList in todoLists"
      :key="todoList.id"
      :title="todoList.title"
      @delete-call="deleteList(todoList.id)"
      @edit-ready="handlerEditTodoList(todoList, $event)"
    >
      <template
        #cards-list
        v-if="
          workspace.getListItems(todoList.id).length ||
          (newTodoItem && todoList.id === newTodoItem.listId)
        "
      >
        <ToDoCard
          v-for="todo in workspace.getListItems(todoList.id)"
          :key="todo.id"
          :title="todo.title"
          :ready="todo.ready"
          @edit-ready="handleItemTitleEdit(todo, $event)"
          @delete-call="workspace.deleteItemById(todo.id)"
          @toggle-ready="handlerTodoItemReadyToggle(todo)"
        />
        <ToDoCard
          v-if="newTodoItem && todoList.id === newTodoItem.listId"
          :title="newTodoItem.title"
          :edit="true"
          @edit-ready="handleNewItemCreate"
          @edit-cancel="handleNewItemCreateCancel"
        />
      </template>
      <template #list-control-panel v-if="todoList.editable">
        <ButtonComponent
          class="w-full blue-btn"
          :disabled="newTodoItem && todoList.id === newTodoItem.listId"
          @click="todoList.id && createListItem(todoList.id)"
          >Add a card</ButtonComponent
        >
      </template>
    </ListComponent>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import ListComponent from "@app/components/List/component.vue";
import ToDoCard from "@app/components/TodoCard/component.vue";
import ButtonComponent from "@app/components/Button/component.vue";
import { onMounted } from "vue";
import { useWorkspace } from "@app/store/Workspace/useWorkspace";
import { ITodoItem } from "@app/types/todo/ITodoItem";
import { ITodoList } from "@app/types/todo/ITodoList";

//app workspace
const workspace = useWorkspace();
const { todoLists, newTodoItem } = storeToRefs(workspace);
onMounted(() => workspace.load());
const createListItem = (id: number) => {
  workspace.createListTodo(id);
  return workspace.load();
};
const addTodoList = () => workspace.createNewTodoList();
const handlerEditTodoList = (list: ITodoList, title?: string) => {
  if (title) {
    const dto = { ...list, title };
    workspace.listUpdate(dto);
  }
};
const handleNewItemCreate = (data: string) => {
  if (newTodoItem.value) {
    newTodoItem.value.title = data;
    return workspace.saveNewItem().then(() => workspace.load(true));
  }
};
const handleNewItemCreateCancel = () => workspace.load(true);
const handleItemTitleEdit = (item: ITodoItem, title: string) =>
  workspace.itemUpdate({ ...item, title });
const deleteList = (id?: number) => id && workspace.deleteListById(id);
const handlerTodoItemReadyToggle = (item: ITodoItem) =>
  workspace.itemUpdate({ ...item, ready: !item.ready });
//card details
// const detailTodoElement = ref<null | ITodoItem>(null);

// const cardDetailsCalled = (todo: ITodoItem) => {
//   detailTodoElement.value = todo;
// };
// const cardDetailsClosed = () => {
//   detailTodoElement.value = null;
// };
</script>

<!--suppress CssUnusedSymbol -->
<style>
html,
body,
#app {
  min-width: 100%;
  min-height: 100vh;
}
#app {
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: min-content;
  gap: 15px;
  align-items: flex-start;
  justify-items: flex-start;
  overflow-y: hidden;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
