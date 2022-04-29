import { Directive } from "vue";

export const focus: Directive = {
  mounted: (el: HTMLElement, binding) => {
    el.focus();
    if (binding.arg === "blur" && binding.value) {
      el.addEventListener("blur", binding.value);
    }
  },
  unmounted: (el: HTMLElement, binding) => {
    if (binding.arg === "blur" && binding.value) {
      el.removeEventListener("blur", binding.value);
    }
  },
};
