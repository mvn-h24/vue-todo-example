<template>
  <div :class="['todo-card', { 'todo-card-editing': editMode }]">
    <div class="w-full relative flex justify-between" @click="callDetail">
      <ToastComponent
        v-for="error in errorList"
        class="absolute right-5"
        :key="error.id"
        :message="error.src"
        @on-down="ErrorShown(error.id)"
      />
      <template v-if="editMode">
        <textarea
          v-focus
          ref="EditArea"
          class="w-full resize-none"
          placeholder="Введите наименование задачи"
          :value="title"
        ></textarea>
        <div class="ml-2 flex">
          <ButtonComponent class="blue-btn h-7" @click="handleEdit"
            >Сохранить</ButtonComponent
          >
          <ButtonComponent class="red-btn ml-0.5 h-7" @click="cancelEdit">
            Отмена
          </ButtonComponent>
        </div>
      </template>
      <template v-else>
        <span :class="{ 'text-red-700': !title.length }">{{
          title.length ? title : "Empty title"
        }}</span>
        <ButtonComponent class="blue-btn ml-4 h-7" @click="ToggleEdit">
          Редактировать
        </ButtonComponent>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import ButtonComponent from "@app/components/Button/component.vue";
import ToastComponent from "@app/components/Toast/component.vue";
import { useErrorList } from "@app/useErrorList";
import { EditActions, useEdit } from "@app/useEdit";

//props
interface ToDoListItemProps {
  title: string;
  edit?: boolean;
}
const props = defineProps<ToDoListItemProps>();
const { title, edit } = toRefs<ToDoListItemProps>(props);
enum ComponentActions {
  callDetail = "detail-call",
}

//edit title
const emit = defineEmits<{
  (e: EditActions.titleEdited, data: string): void;
  (e: EditActions.titleEditCancel): void;
  (e: ComponentActions.callDetail): void;
}>();
const { editMode, cancelEdit, ApplyEdit, ToggleEdit } = useEdit(
  edit?.value !== undefined && edit.value,
  emit
);

const callDetail = () => emit(ComponentActions.callDetail);
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
