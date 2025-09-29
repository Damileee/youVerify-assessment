<template>
  <div :class="[props.variant === ActivityVariant.TIMELINE ? '' : 'space-y-6']">
    <div
      v-for="(activity, index) in props.activities"
      :key="activity.id"
      class="relative flex gap-4"
    >
      <!-- Avatar -->
      <div class="flex flex-col items-center">
        <div>
          <component :is="activity.avatar" class="w-12 h-12 rounded-full" />
        </div>
        <!-- Line (only for timeline variant) -->
        <div
          v-if="
            props.variant === ActivityVariant.TIMELINE &&
            index !== props.activities.length - 1
          "
          class="mt-2 h-full w-px bg-[#E3E6EF]"
        />
      </div>

      <!-- Content -->
      <div
        :class="[
          'flex-1',
          props.variant === ActivityVariant.TIMELINE ? 'pb-6' : '',
        ]"
      >
        <h3 class="font-medium text-black text-lg">
          {{ activity.title ?? activity.user }}
        </h3>
        <p class="text-sm text-[#697598] font-normal">
          {{ activity.timestamp }}
        </p>
        <div class="mt-1 rounded-2xl bg-[#F6F8FA] p-4 text-sm text-gray-700">
          <span v-html="activity.description" />
          <span v-if="activity.highlight" class="font-semibold text-gray-900">
            {{ activity.highlight }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ActivityItem } from "~/types/activity";
import { ActivityVariant } from "~/types/activity";

const props = defineProps<{
  activities: ActivityItem[];
  variant?: ActivityVariant;
}>();
</script>
