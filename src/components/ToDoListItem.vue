<template>
  <div :class="['todo-card', { 'todo-card-editing': editing }]">
    <div class="w-full relative">
      <template v-if="errors">
        <TransitionGroup name="error-mess">
          <ToastMessage
            v-for="(errorMessage, index) in errors"
            class="absolute right-5"
            :key="index"
            :message="errorMessage"
            :type="'error'"
          />
        </TransitionGroup>
      </template>
      <template v-if="editing">
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
        <span @click="ToggleEdit">{{ title }}</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import ToastMessage from "@app/components/ToastMessage.vue";

//props
interface ToDoListItemProps {
  title: string;
  edit?: boolean;
}
const props = defineProps<ToDoListItemProps>();
const { title, edit } = toRefs<ToDoListItemProps>(props);

//errors
const errors = ref<Array<string>>([]);
enum Errors {
  titleEmpty = "empty title",
}
watch(
  () => errors.value.length,
  () => {
    setTimeout(function () {
      errors.value = [];
    }, 3000);
  },
  { flush: "post" }
);

//edit title
const editing = ref(edit?.value !== undefined && edit.value);

enum EditActions {
  titleEdited = "title-edited",
  titleEditCancel = "title-edit-cancel",
}
interface EditEmits {
  (e: EditActions.titleEdited, editedTitle: string): void;
  (e: EditActions.titleEditCancel): void;
}
const emit = defineEmits<EditEmits>();

const ToggleEdit = () => {
  editing.value = !editing.value;
};
const cancelEdit = () => {
  editing.value = false;
  emit(EditActions.titleEditCancel);
};

//text area
const EditArea = ref<HTMLElement | null>(null);
function handleEdit() {
  if (EditArea.value !== null) {
    const textarea = EditArea.value as HTMLTextAreaElement;
    if (textarea.value.length) {
      emit(EditActions.titleEdited, textarea.value);
      ToggleEdit();
    } else {
      errors.value.push(Errors.titleEmpty);
    }
  }
}
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
.error-mess-enter-active,
.error-mess-leave-active {
  transition: all 0.5s ease;
}
.error-mess-enter-from,
.error-mess-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
