import { Directive } from "vue";

export const focus: Directive = {
  mounted: (el: HTMLElement, binding) => {
    el.focus();
    if (binding.arg === "focusout" && binding.value) {
      el.addEventListener("focusout", binding.value);
    }
  },
  unmounted: (el: HTMLElement, binding) => {
    if (binding.arg === "focusout" && binding.value) {
      el.removeEventListener("focusout", binding.value);
    }
  },
};
