<template>
  <Transition :name="direction" :style="{ ...transition, ...translate }">
    <slot />
  </Transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ToastDirection } from "./types";

export default defineComponent({
  name: "ShowTransition",
  props: {
    direction: {
      type: String as PropType<ToastDirection>,
      default: () => ToastDirection.rightToLeft,
    },
    easeSeconds: {
      type: Number,
      default: () => 1,
    },
    pathLength: {
      type: Number,
      default: () => 30,
    },
  },
  computed: {
    transition() {
      return { "--transition-pars": `all ${this.easeSeconds}s ease` };
    },
    pathLengthDirectional() {
      return this.direction === ToastDirection.leftToRight ||
        this.direction === ToastDirection.topToBottom
        ? this.pathLength * -1
        : this.pathLength;
    },
    translate() {
      return {
        "--path-length": `${this.pathLengthDirectional}px`,
      };
    },
  },
});
</script>

<!--suppress CssUnusedSymbol -->
<style>
.topToBottom-enter-active,
.topToBottom-leave-active,
.leftToRight-enter-active,
.leftToRight-leave-active,
.topToBottom-enter-active,
.topToBottom-leave-active,
.rightToLeft-enter-active,
.rightToLeft-leave-active {
  --transition-pars: all 5s ease;
  --path-length: 100px;
  transition: var(--transition-pars);
}

.topToBottom-enter-from,
.topToBottom-leave-to {
  opacity: 0;
  transform: translateY(var(--path-length));
}

.leftToRight-enter-from,
.leftToRight-leave-to {
  opacity: 0;
  transform: translateX(var(--path-length));
}

.topToBottom-enter-from,
.topToBottom-leave-to {
  opacity: 0;
  transform: translateY(var(--path-length));
}

.rightToLeft-enter-from,
.rightToLeft-leave-to {
  opacity: 0;
  transform: translateX(var(--path-length));
}
</style>
