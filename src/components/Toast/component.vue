<template>
  <ShowSlideTransition @after-leave="selfRemove">
    <div
      v-show="show"
      :class="[
        'toast-message',
        {
          'toast-error': toastTypes.error === toast,
          'toast-notify': toastTypes.notify === toast,
          'toast-warning': toastTypes.warning === toast,
        },
      ]"
    >
      <div class="w-10 border-r px-2">
        <svg
          v-if="toastTypes.error === toast"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          ></path>
        </svg>
        <svg
          v-else-if="toastTypes.notify === toast"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          ></path>
        </svg>
        <svg
          v-else-if="toastTypes.warning === toast"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
          ></path>
        </svg>
      </div>

      <div class="flex items-center px-2 py-3">
        <div class="mx-3">
          <p>
            {{ message }}
          </p>
        </div>
      </div>
    </div>
  </ShowSlideTransition>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { ToastType } from "./type";
import ShowSlideTransition from "@app/components/Transition/ShowSlideTransition.vue";

export default defineComponent({
  components: {
    ShowSlideTransition,
  },
  name: "ToastComponent",
  setup() {
    const show = ref(false);
    return { show };
  },
  props: {
    toast: {
      type: String as PropType<ToastType>,
      default: () => ToastType.error,
    },
    message: String,
    showtime: {
      type: Number,
      default: () => 3000,
    },
    removeSelf: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    toastTypes: () => ToastType,
  },
  mounted() {
    this.show = true;
  },
  methods: {
    selfRemove() {
      this.$emit("onDown");
      if (this.removeSelf) {
        this.$el.remove();
      }
    },
  },
  watch: {
    show() {
      setTimeout(() => {
        this.show = false;
      }, this.showtime);
    },
  },
});
</script>

<style src="./tailwind.css" scoped />
