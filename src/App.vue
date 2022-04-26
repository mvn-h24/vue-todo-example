<template>
  <ButtonComponent class="green-btn mb-5" @click="addTodoList"
    >Add todo list</ButtonComponent
  >
  <div class="grid grid-flow-col auto-cols-max gap-5">
    <ListComponent
      v-for="todoList in todoLists"
      :key="todoList.id"
      :title="todoList.title"
      @edit-ready="handlerEditTodoList(todoList, $event)"
    >
      <template
        #cards-list
        v-if="workspace.getListItems(todoList.id).length || newTodoItem"
      >
        <ToDoCard
          v-for="todo in workspace.getListItems(todoList.id)"
          :key="todo.id"
          :title="todo.title"
          @edit-ready="handleItemTitleEdit(todo, $event)"
          @delete-call="workspace.deleteItemById(todo.id)"
        >
          {{ todo }}
        </ToDoCard>
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
          class="blue-btn w-full"
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
const handlerEditTodoList = (list: ITodoList, title: string) => {
  const dto = { ...list, title };
  workspace.listUpdate(dto);
};
const handleNewItemCreate = (data: string) => {
  console.log("handleNewItemCreate");
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

<!--suppress CssUnusedSymbol -->
<style>
html,
body,
#app {
  min-width: 100%;
  min-height: 100vh;
}
#app {
  display: flex;
  flex-direction: column;
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
