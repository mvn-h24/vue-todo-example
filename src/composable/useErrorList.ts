import { Ref, ref } from "vue";

export function useErrorList<T = string>(initArr: Array<T> = []) {
  // const errorListRaw = new ErrorList<T>(initArr);
  const errorList = ref(initArr) as Ref<Array<T>>;

  return {
    errorList,
    removeOne: (n: number) => {
      errorList.value = errorList.value.filter((a, index) => index !== n);
    },
    addOne(v: T) {
      errorList.value.push(v);
    },
  };
}
