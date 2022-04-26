<template>
  <div class="todo-list overflow-hidden">
    <div class="grid auto-rows-min gap-1">
      <div class="min-h-7 overflow-hidden">
        <ShowSlideTransition :direction="'topToBottom'" :hide-immediate="true">
          <template v-if="editMode">
            <div class="grid grid-flow-col auto-cols-min gap-2.5 max-w-full">
              <ButtonComponent class="red-btn" @click="cancelEdit"
                >Cancel</ButtonComponent
              >
              <ButtonComponent class="green-btn" @click="applyEdit"
                >Save</ButtonComponent
              >
            </div>
          </template>
          <template v-else>
            <ButtonComponent class="green-btn" @click="ToggleEdit"
              >Edit</ButtonComponent
            >
          </template>
        </ShowSlideTransition>
      </div>
      <input
        v-focus
        v-if="editMode"
        class="bg-transparent text-black text-sm"
        v-model="editTitle"
        placeholder="title"
      />
      <h3 class="text-sm" v-else-if="title.length">{{ title }}</h3>
    </div>
    <div class="flex flex-col">
      <div
        class="mt-2"
        v-if="$slots['cards-list'] && $slots['cards-list']().length"
      >
        <slot name="cards-list"></slot>
      </div>
      <div
        v-if="
          $slots['list-control-panel'] && $slots['list-control-panel']().length
        "
        class="mt-2"
      >
        <slot name="list-control-panel"></slot>
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

const emit = defineEmits<{
  (e: EditActions.editReady, data: string | undefined): void;
  (e: EditActions.editCancel): void;
}>();
const { editMode, cancelEdit, ApplyEdit, ToggleEdit } = useEdit<
  string | undefined
>(false, emit);
const applyEdit = () => {
  ApplyEdit(editTitle.value?.trim());
  ToggleEdit();
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
