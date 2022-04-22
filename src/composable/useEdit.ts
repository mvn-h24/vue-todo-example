import { ref } from "vue";

export enum EditActions {
  titleEdited = "title-edited",
  titleEditCancel = "title-edit-cancel",
}
export interface EditEmits<Data> {
  (e: EditActions.titleEdited, data: Data): void;
  (e: EditActions.titleEditCancel): void;
}
export function useEdit<Data = string>(init = false, emit: EditEmits<Data>) {
  const editMode = ref(init);

  const ToggleEdit = () => {
    editMode.value = !editMode.value;
  };
  const cancelEdit = () => {
    editMode.value = false;
    emit(EditActions.titleEditCancel);
  };
  const ApplyEdit = (data: Data) => {
    emit(EditActions.titleEdited, data);
  };
  return {
    editMode,
    ToggleEdit,
    cancelEdit,
    ApplyEdit,
  };
}
