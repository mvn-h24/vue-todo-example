import { ref } from "vue";

export enum EditActions {
  editReady = "edit-ready",
  editCancel = "edit-cancel",
}
export interface EditEmits<Data> {
  (e: EditActions.editReady, data: Data): void;
  (e: EditActions.editCancel): void;
}
export function useEdit<Data = string>(init = false, emit: EditEmits<Data>) {
  const editMode = ref(init);

  const ToggleEdit = () => {
    editMode.value = !editMode.value;
  };
  const CancelEdit = () => {
    editMode.value = false;
    emit(EditActions.editCancel);
  };
  const ApplyEdit = (data: Data) => {
    emit(EditActions.editReady, data);
  };
  return {
    editMode,
    ToggleEdit,
    CancelEdit,
    ApplyEdit,
  };
}
