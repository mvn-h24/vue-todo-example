<template>
  <div :class="['todo-card', { 'todo-card-editing': editMode }]">
    <div class="w-full relative">
      <ToastComponent
        v-for="(errorMessage, index) in errorList"
        class="absolute right-5"
        :key="index"
        :message="errorMessage"
        @on-down="removeOne(index)"
      />
      <template v-if="editMode">
        <textarea
          ref="EditArea"
          class="w-full resize-none"
          placeholder="Введите наименование задачи"
          :value="title"
        ></textarea>
        <button class="blue-btn w-auto" @click="handleEdit">Сохранить</button>
        <button class="ml-1.5 red-btn w-auto" @click="cancelEdit">
          Отмена
        </button>
      </template>
      <template v-else>
        <span :class="{ 'text-red-700': !title.length }" @click="ToggleEdit">{{
          title.length ? title : "Empty title"
        }}</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
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

//errors
const { errorList, removeOne, addOne } = useErrorList();
enum Errors {
  titleEmpty = "Empty title",
}

//edit title
const emit = defineEmits<{
  (e: EditActions.titleEdited, data: string): void;
  (e: EditActions.titleEditCancel): void;
}>();
const { editMode, cancelEdit, ApplyEdit, ToggleEdit } = useEdit(
  edit?.value !== undefined && edit.value,
  emit
);

//text area
const EditArea = ref<HTMLElement | null>(null);
function handleEdit() {
  if (EditArea.value !== null) {
    const textarea = EditArea.value as HTMLTextAreaElement;
    if (textarea.value.length) {
      ApplyEdit(textarea.value);
      ToggleEdit();
    } else {
      addOne(Errors.titleEmpty);
    }
  }
}
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ToDoCard",
});
</script>
