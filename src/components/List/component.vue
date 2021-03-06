<template>
  <div class="overflow-hidden list-container">
    <div class="relative grid w-full grid-flow-row gap-2 auto-rows-min">
      <input
        v-focus:focusout="cancelEdit"
        v-if="editMode"
        class="z-20 py-1 text-sm text-black bg-gray-200 rounded-md"
        v-model="editTitle"
        placeholder="title"
      />
      <h3
        :class="[
          'text-sm rounded-md py-1 hover:ring-2 hover:ring-yellow-500 z-20',
          { 'text-red-700': !title.length },
        ]"
        v-else
        @click="ToggleEdit"
      >
        {{ title.length ? title : "Empty title" }}
      </h3>

      <ShowSlideTransition :direction="'topToBottom'" :hide-immediate="true">
        <div
          v-if="editMode"
          class="z-10 grid grid-flow-col auto-cols-min gap-2.5"
        >
          <ButtonComponent class="green-btn" @click="applyEdit" ref="saveBtn"
            >Save</ButtonComponent
          >
          <ButtonComponent class="red-btn" @click="callDelete" ref="deleteBtn"
            >Delete</ButtonComponent
          >
        </div>
      </ShowSlideTransition>
    </div>
    <div
      class="grid w-full grid-flow-row gap-2 mt-2"
      v-if="
        ($slots['cards-list'] && $slots['cards-list']().length) ||
        ($slots['list-control-panel'] && $slots['list-control-panel']().length)
      "
    >
      <div v-if="$slots['cards-list'] && $slots['cards-list']().length">
        <slot name="cards-list" />
      </div>
      <div
        v-if="
          $slots['list-control-panel'] && $slots['list-control-panel']().length
        "
      >
        <slot name="list-control-panel" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import { EditActions, useEdit } from "@app/useEdit";
import ButtonComponent from "@app/components/Button/component.vue";
import ShowSlideTransition from "@app/components/Transition/ShowSlideTransition.vue";

interface TodoListProps {
  title?: string;
}
const props = withDefaults<Readonly<TodoListProps>, TodoListProps>(
  defineProps<TodoListProps>(),
  {
    title: "To do list",
  }
);
const { title } = toRefs<TodoListProps>(props);
const editTitle = ref(title?.value);
const saveBtn = ref(null);
const deleteBtn = ref(null);

enum ComponentActions {
  deleteCall = "delete-call",
}
const emit = defineEmits<{
  (e: EditActions.editReady, data: string | undefined): void;
  (e: EditActions.editCancel): void;
  (e: ComponentActions.deleteCall): void;
}>();
const { editMode, CancelEdit, ApplyEdit, ToggleEdit } = useEdit<
  string | undefined
>(false, emit);
const applyEdit = () => {
  ApplyEdit(editTitle.value?.trim());
  ToggleEdit();
};
const cancelEdit = (e: FocusEvent) => {
  if (
    saveBtn.value &&
    saveBtn.value["$el"] !== e.relatedTarget &&
    deleteBtn.value &&
    deleteBtn.value["$el"] !== e.relatedTarget
  ) {
    CancelEdit();
    e.preventDefault();
  }
};
const callDelete = () => {
  emit(ComponentActions.deleteCall);
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
import { focus } from "@app/directive";

export default defineComponent({
  name: "ListComponent",
  directives: {
    focus,
  },
});
</script>
<style src="./tailwind.css" scoped />
