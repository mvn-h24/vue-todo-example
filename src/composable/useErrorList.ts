import { Ref, ref } from "vue";

export function useErrorList<T = string>(
  initArr: Array<{ id: number; src: T }> = []
) {
  const errorList = ref(initArr) as Ref<Array<{ id: number; src: T }>>;

  return {
    errorList,
    removeError: (id?: number) => {
      if (id) {
        errorList.value = errorList.value.filter((a) => a.id !== id);
      } else {
        errorList.value.pop();
      }
    },
    addError(src: T) {
      errorList.value.push({ id: Math.random(), src });
    },
  };
}
