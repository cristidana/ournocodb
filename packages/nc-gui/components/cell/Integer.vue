<script setup lang="ts">
import type { VNodeRef } from '@vue/runtime-core'
import { inject, useVModel } from '#imports'
import { EditModeInj } from '~/context'

interface Props {
  modelValue: number | null | undefined
}

interface Emits {
  (event: 'update:modelValue', model: number): void
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()

const editEnabled = inject(EditModeInj)

const vModel = useVModel(props, 'modelValue', emits)

const focus: VNodeRef = (el) => (el as HTMLInputElement)?.focus()

function onKeyDown(evt: KeyboardEvent) {
  return evt.key === '.' && evt.preventDefault()
}
</script>

<template>
  <input
    v-if="editEnabled"
    :ref="focus"
    v-model="vModel"
    class="outline-none p-0 border-none w-full h-full prose-sm"
    type="number"
    @blur="editEnabled = false"
    @keydown="onKeyDown"
  />
  <span v-else class="prose-sm">{{ vModel }}</span>
</template>

<style scoped lang="scss">
input[type='number']:focus {
  @apply ring-transparent;
}
</style>