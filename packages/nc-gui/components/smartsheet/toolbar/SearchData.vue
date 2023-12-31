<script lang="ts" setup>
import { isSystemColumn } from 'nocodb-sdk'
import type { TableType } from 'nocodb-sdk'
import {
  ActiveViewInj,
  ReloadViewDataHookInj,
  computed,
  iconMap,
  inject,
  onClickOutside,
  ref,
  useFieldQuery,
  useSmartsheetStoreOrThrow,
} from '#imports'

const reloadData = inject(ReloadViewDataHookInj)!

const { meta } = useSmartsheetStoreOrThrow()

const activeView = inject(ActiveViewInj, ref())

const { search, loadFieldQuery } = useFieldQuery()

const isDropdownOpen = ref(false)

const searchDropdown = ref(null)

onClickOutside(searchDropdown, () => (isDropdownOpen.value = false))

const columns = computed(() =>
  (meta.value as TableType)?.columns
    ?.filter((c) => {
      return !isSystemColumn(c)
    })
    .map((column) => ({
      value: column.id,
      label: column.title,
      column,
    })),
)

watch(
  () => activeView.value?.id,
  (n, o) => {
    if (n !== o) {
      loadFieldQuery(activeView.value?.id)
    }
  },
  { immediate: true },
)

function onPressEnter() {
  reloadData.trigger()
}
</script>

<template>
  <div class="flex flex-row border-1 rounded-sm">
    <div
      ref="searchDropdown"
      class="flex items-center relative bg-gray-50 px-2 cursor-pointer border-r-1"
      :class="{ '!bg-gray-100 ': isDropdownOpen }"
      @click="isDropdownOpen = !isDropdownOpen"
    >
      <component :is="iconMap.search" class="text-grey" />

      <component :is="iconMap.arrowDown" class="text-grey" />

      <a-select
        v-model:value="search.field"
        :open="isDropdownOpen"
        size="small"
        :dropdown-match-select-width="false"
        dropdown-class-name="!py-0 !rounded nc-dropdown-toolbar-search-field-option"
        class="!absolute top-0 left-0 w-full h-full z-10 !text-xs opacity-0"
      >
        <a-select-option v-for="op of columns" :key="op.value" :value="op.value">
          <div class="flex items-center -ml-1 gap-2">
            <SmartsheetHeaderIcon class="" :column="op.column" />
            {{ op.label }}
          </div>
        </a-select-option>
      </a-select>
    </div>

    <a-input
      v-model:value="search.query"
      size="small"
      class="max-w-[200px] !text-xs"
      :placeholder="$t('placeholder.filterQuery')"
      :bordered="false"
      data-testid="search-data-input"
      @press-enter="onPressEnter"
    >
      <template #addonBefore> </template>
    </a-input>
  </div>
</template>

<style scoped>
:deep(input::placeholder) {
  @apply !text-xs;
}
</style>
