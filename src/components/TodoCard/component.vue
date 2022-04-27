<template>
  <div
    :class="[
      'todo-card',
      { 'todo-card-editing': editMode },
      { 'todo-card-ready': ready },
    ]"
    @click.self="callDetail"
  >
    <ToastComponent
      v-for="error in errorList"
      class="absolute top-0.5 right-0.5 w-1/2"
      :key="error.id"
      :message="error.src"
      @on-down="ErrorShown(error.id)"
    />
    <input
      v-focus:focusout="cancelEdit"
      ref="EditArea"
      class="w-full resize-none bg-transparent p-1"
      placeholder="Введите наименование задачи"
      :value="title"
      v-if="editMode"
    />
    <div
      v-else
      :class="[
        'ease-in-out duration-300',
        'rounded-md p-1 break-all',
        'inline-block w-full inline-block',
        'hover:ring-2 hover:ring-yellow-500',
        { 'text-red-700': !title.length },
      ]"
      @click="ToggleEdit"
    >
      {{ title.length ? title : "Empty title" }}
    </div>
    <div class="h-6 overflow-hidden">
      <ShowSlideTransition :direction="'topToBottom'" :hide-immediate="true">
        <div class="todo-card__btn-group" v-if="editMode">
          <ButtonComponent class="blue-btn" ref="saveBtn" @click="handleEdit"
            >Сохранить</ButtonComponent
          >
          <ButtonComponent class="red-btn" @click="cancelEdit">
            Отмена
          </ButtonComponent>
        </div>
        <div class="todo-card__btn-group" v-else>
          <ButtonComponent
            :class="{ 'green-btn': !ready, 'yellow-btn': ready }"
            @click="toggleReady"
          >
            {{ ready ? "Выполнено" : "Готово" }}
          </ButtonComponent>
          <ButtonComponent v-if="ready" class="red-btn" @click="callDelete">
            Удалить
          </ButtonComponent>
        </div>
      </ShowSlideTransition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import ButtonComponent from "@app/components/Button/component.vue";
import ToastComponent from "@app/components/Toast/component.vue";
import ShowSlideTransition from "@app/components/Transition/ShowSlideTransition.vue";
import { useErrorList } from "@app/useErrorList";
import { EditActions, useEdit } from "@app/useEdit";

//props
interface ToDoListItemProps {
  title: string;
  edit?: boolean;
  ready?: boolean;
}
const props = defineProps<ToDoListItemProps>();
const { title, edit, ready } = toRefs<ToDoListItemProps>(props);
enum ComponentActions {
  callDetail = "detail-call",
  callDelete = "delete-call",
  toggleReady = "toggle-ready",
}
const saveBtn = ref(null);
const emit = defineEmits<{
  (e: EditActions.editReady, data: string): void;
  (e: EditActions.editCancel): void;
  (e: ComponentActions.callDetail): void;
  (e: ComponentActions.callDelete): void;
  (e: ComponentActions.toggleReady): void;
}>();
const toggleReady = () => {
  emit(ComponentActions.toggleReady);
};

//edit title
const { editMode, CancelEdit, ApplyEdit, ToggleEdit } = useEdit(
  edit?.value !== undefined && edit.value,
  emit
);
const cancelEdit = (e: FocusEvent) => {
  if (saveBtn.value && saveBtn.value["$el"] !== e.relatedTarget) {
    CancelEdit();
  }
};
const callDetail = () => {
  !editMode.value && emit(ComponentActions.callDetail);
};
const callDelete = () => {
  emit(ComponentActions.callDelete);
};

//errors
const { errorList, removeError, addError } = useErrorList();
enum Errors {
  titleEmpty = "Empty title",
}
const ErrorShown = (id: number) => {
  removeError(id);
  EditArea.value?.focus();
};

//text area
const EditArea = ref<HTMLElement | null>(null);
function handleEdit() {
  if (EditArea.value !== null) {
    const textarea = EditArea.value as HTMLTextAreaElement;
    if (textarea.value.length) {
      ApplyEdit(textarea.value);
      ToggleEdit();
    } else {
      addError(Errors.titleEmpty);
    }
  }
}
</script>

<script lang="ts">
import { defineComponent } from "vue";
import { focus } from "@app/directive";

export default defineComponent({
  name: "ToDoCard",
  directives: {
    focus,
  },
});
</script>
