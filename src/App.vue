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
        @detail-call="cardDetailsCalled(todo)"
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
      <ButtonComponent
        class="blue-btn w-full"
        @click="createListItem(listIndex)"
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
import { useUserWorkspace } from "@app/store/useUserWorkspace";
import { ITodoListItem } from "@app/types/todo/ITodoListItem";
import ListComponent from "@app/components/List/component.vue";
import ToDoCard from "@app/components/TodoCard/component.vue";
import ButtonComponent from "@app/components/Button/component.vue";
import { ref } from "vue";
import ModalDialogComponent from "@app/components/ModalDialog/component.vue";
import TodoDetailComponent from "@app/components/TodoDetail/component.vue";

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

//card details
const detailTodoElement = ref<null | ITodoListItem>(null);
const handleNewItemCreate = (listIndex: number, item: ITodoListItem) => {
  store.addTodo(listIndex, item);
  newListItem.value = null;
};
const cardDetailsCalled = (todo: ITodoListItem) => {
  detailTodoElement.value = todo;
};
const cardDetailsClosed = () => {
  detailTodoElement.value = null;
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
