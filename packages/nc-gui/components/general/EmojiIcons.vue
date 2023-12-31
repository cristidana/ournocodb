<script lang="ts" setup>
import { Icon as IconifyIcon } from '@iconify/vue'
import InfiniteLoading from 'v3-infinite-loading'
import { emojiIcons } from '#imports'

const props = defineProps<{
  showReset?: boolean
}>()

const emit = defineEmits(['selectIcon'])
let search = $ref('')

// keep a variable to load icons with infinite scroll
// set initial value to 60 to load first 60 icons (index - `0 - 59`)
// and next value will be 120 and shows first 120 icons ( index - `0 - 129`)
let toIndex = $ref(60)

const filteredIcons = computed(() => {
  return emojiIcons.filter((icon) => !search || icon.toLowerCase().includes(search.toLowerCase())).slice(0, toIndex)
})

const load = () => {
  // increment `toIndex` to include next set of icons
  toIndex += Math.min(filteredIcons.value.length, toIndex + 60)
  if (toIndex > filteredIcons.value.length) {
    toIndex = filteredIcons.value.length
  }
}

const selectIcon = (icon?: string) => {
  search = ''
  emit('selectIcon', icon && `emojione:${icon}`)
}
</script>

<template>
  <div>
    <div class="p-1 w-[280px] h-[280px] flex flex-col gap-1 justify-start nc-emoji" data-testid="nc-emoji-container">
      <div @click.stop>
        <input
          v-model="search"
          data-testid="nc-emoji-filter"
          class="p-1 text-xs border-1 w-full overflow-y-auto"
          placeholder="Search"
          @input="toIndex = 60"
        />
      </div>
      <div class="flex gap-1 flex-wrap w-full flex-shrink overflow-y-auto scrollbar-thin-dull">
        <div v-for="icon of filteredIcons" :key="icon" @click="selectIcon(icon)">
          <span class="cursor-pointer nc-emoji-item">
            <IconifyIcon class="text-xl iconify" :icon="`emojione:${icon}`"></IconifyIcon>
          </span>
        </div>
        <InfiniteLoading @infinite="load"><span /></InfiniteLoading>
      </div>
    </div>
    <div v-if="props.showReset" class="m-1">
      <a-divider class="!my-2 w-full" />
      <div class="p-1 mt-1 cursor-pointer text-xs inline-block border-gray-200 border-1 rounded" @click="selectIcon()">
        <PhXCircleLight class="text-sm" />
        Reset Icon
      </div>
    </div>
  </div>
</template>

<style scoped>
.nc-emoji-item {
  @apply hover:(bg-primary bg-opacity-10) active:(bg-primary !bg-opacity-20) rounded-md w-[38px] h-[38px] block flex items-center justify-center;
}
</style>
