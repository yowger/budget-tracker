<template>
  <div class="bg-white p-4 rounded-sm">
    <div v-if="$slots.header">
      <slot name="header"></slot>
    </div>

    <div v-if="$slots.default">
      <slot></slot>
    </div>

    <div v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
