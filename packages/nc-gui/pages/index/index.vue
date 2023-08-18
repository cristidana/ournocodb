<script lang="ts" setup>
import { useRoute, useSidebar } from '#imports'

const route = useRoute()

useSidebar('nc-left-sidebar', { hasSidebar: false })
</script>

<template>
  <NuxtLayout>
    <div class="min-h-[calc(100vh_-_var(--header-height))] bg-primary bg-opacity-5 flex flex-col justify-center items-center py-6 px-4 md:(px-12 pt-65px)">
      <div class="min-w-2/4 xl:max-w-2/4 w-full mx-auto">
        <NuxtPage :transition="false" />
      </div>

      <div
        :class="{ 'flex-1': route.name === 'index-index' }"
        class="flex gap-6 flex-col justify-center items-center md:(flex-row justify-between items-start)"
      >
        <template v-if="route.name === 'index-index'">
        </template>
      </div>
    </div>
  </NuxtLayout>
</template>
